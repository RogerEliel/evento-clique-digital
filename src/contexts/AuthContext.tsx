
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getUser, UserRole, UserData, clearUser, saveUser } from "@/utils/auth";

interface AuthContextType {
  user: UserData | null;
  userRole: UserRole | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isPhotographer: boolean;
  isClient: boolean;
  redirectCount: number;
  incrementRedirectCount: () => void;
  resetRedirectCount: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectCount, setRedirectCount] = useState(0);

  useEffect(() => {
    console.log('[AuthProvider] Initializing with redirect count:', redirectCount);
    // Check for existing user in local storage
    const storedUser = getUser();
    if (storedUser) {
      console.log('[AuthProvider] Found stored user:', storedUser.type);
      setUser(storedUser);
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[AuthProvider] Auth state changed:', event);
        if (event === "SIGNED_OUT") {
          clearUser();
          setUser(null);
        } else if (session?.user && event === "SIGNED_IN") {
          // When user signs in, we fetch their role
          setTimeout(async () => {
            try {
              const { data: roleData } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", session.user.id)
                .single();
              
              if (roleData) {
                const userData: UserData = {
                  type: roleData.role as UserRole,
                  email: session.user.email
                };
                console.log('[AuthProvider] User signed in with role:', userData.type);
                saveUser(userData);
                setUser(userData);
              }
            } catch (error) {
              console.error("[AuthProvider] Error fetching user role:", error);
            }
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        console.log('[AuthProvider] No active session found');
        setIsLoading(false);
        return;
      }

      console.log('[AuthProvider] Active session found');
      if (!storedUser && session?.user) {
        // If we have a session but no stored user, fetch the role
        setTimeout(async () => {
          try {
            const { data: roleData } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .single();
            
            if (roleData) {
              const userData: UserData = {
                type: roleData.role as UserRole,
                email: session.user.email
              };
              console.log('[AuthProvider] Fetched user role from session:', userData.type);
              saveUser(userData);
              setUser(userData);
            }
          } catch (error) {
            console.error("[AuthProvider] Error fetching user role:", error);
          } finally {
            setIsLoading(false);
          }
        }, 0);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      console.log('[AuthProvider] Logging out');
      await supabase.auth.signOut();
      clearUser();
      setUser(null);
      resetRedirectCount();
    } catch (error) {
      console.error('[AuthProvider] Error during logout:', error);
      throw error;
    }
  };

  const incrementRedirectCount = () => {
    setRedirectCount(prevCount => {
      const newCount = prevCount + 1;
      console.log('[AuthProvider] Incrementing redirect count to:', newCount);
      return newCount;
    });
  };

  const resetRedirectCount = () => {
    console.log('[AuthProvider] Resetting redirect count');
    setRedirectCount(0);
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.type);
    }
    
    return user.type === role;
  };

  const userRole = user?.type || null;
  const isAdmin = userRole === 'admin';
  const isPhotographer = userRole === 'photographer';
  const isClient = userRole === 'client';

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isLoading,
        logout,
        isAdmin,
        isPhotographer,
        isClient,
        redirectCount,
        incrementRedirectCount,
        resetRedirectCount,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
