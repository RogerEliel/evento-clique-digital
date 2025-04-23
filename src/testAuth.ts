import { registerUser } from './auth/register';
import { loginUser } from './auth/login';
import { logoutUser } from './auth/logout';
import { getCurrentUser } from './auth/getUser';

async function testAuthFlow() {
  try {
    console.log('=== Testando Registro ===');
    const register = await registerUser('email@example.com', 'password123');
    console.log('Usuário registrado com sucesso:', register);

    console.log('=== Testando Login ===');
    const login = await loginUser('email@example.com', 'password123');
    console.log('Usuário logado com sucesso:', login);

    console.log('=== Testando Obter Usuário Atual ===');
    const currentUser = await getCurrentUser();
    console.log('Usuário atual:', currentUser);

    console.log('=== Testando Logout ===');
    await logoutUser();
    console.log('Logout realizado com sucesso!');
  } catch (error) {
    console.error('Erro durante o fluxo de autenticação:', error.message);
  }
}

// Executa os testes
testAuthFlow();