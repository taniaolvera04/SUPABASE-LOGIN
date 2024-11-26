import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.21.0/+esm';

// Inicializar Supabase
const supabaseUrl = 'https://ogbhjdhsrmaabjawkpjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYmhqZGhzcm1hYWJqYXdrcGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NTQ0MDksImV4cCI6MjA0ODEzMDQwOX0.FDCfx0DicRk8Ao_oj_1ygMtPczn1AL4IOfQ7e_1eM7U';
const supabase = createClient(supabaseUrl, supabaseKey);



// Función de inicio de sesión con correo y contraseña
const loginWithEmail = async function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data: user, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Error al iniciar sesión:', error.message);
    document.getElementById('error-message').textContent = error.message;
  } else {
    console.log('Usuario autenticado:', user);
    window.location.href = `hola.html?user=${user.user.email}`;
  }
};

const loginWithSpotify = async function () {
  try {
    console.log('Iniciando sesión con Spotify...');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: 'https://ogbhjdhsrmaabjawkpjz.supabase.co/auth/v1/callback', // Asegúrate que esto esté correctamente configurado
      },
    });
    if (error) {
      console.error('Error al iniciar sesión con Spotify:', error.message);
      alert(error.message);
    } else {
      console.log('Redirigiendo...');
    }
  } catch (error) {
    console.error('Error inesperado:', error.message);
    alert(error.message);
  }
};

// Función de inicio de sesión con GitHub
const loginWithGitHub = async function () {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    redirectTo: 'https://ogbhjdhsrmaabjawkpjz.supabase.co/auth/v1/callback',
  });
  if (error) {
    console.error('Error al iniciar sesión con GitHub:', error.message);
    alert(error.message);
  }
};

// Asignar las funciones al objeto global (window)
window.loginWithEmail = loginWithEmail;
window.loginWithSpotify = loginWithSpotify;
window.loginWithGitHub = loginWithGitHub;

document.addEventListener('DOMContentLoaded', function () {
  console.log('Supabase inicializado:', supabase);
});
