
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in local storage
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
                saveUser(userData);
                setUser(userData);
              }
            } catch (error) {
              console.error("Error fetching user role:", error);
            }
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setIsLoading(false);
        return;
      }

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
              saveUser(userData);
              setUser(userData);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
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
      await supabase.auth.signOut();
      clearUser();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
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
        isClient
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
