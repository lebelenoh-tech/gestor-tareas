// 1. IMPORTAR LOS MÓDULOS DE FIREBASE DESDE INTERNET
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2. CONFIGURACIÓN REAL DE TU PROYECTO
const firebaseConfig = {
    apiKey: "AIzaSyBCxchafesCKf2dzb2LQAmooa4yU8w0S-0",
    authDomain: "productividad-timer-db.firebaseapp.com",
    projectId: "productividad-timer-db",
    storageBucket: "productividad-timer-db.firebasestorage.app",
    messagingSenderId: "660058647839",
    appId: "1:660058647839:web:2d0d333cd77481915dd42a",
    measurementId: "G-ZE9PC1J0KG"
};

// Inicializar Firebase y la Autenticación
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. CONTROL DE LA INTERFAZ (LOGIN / REGISTRO)
let esLogin = true;

const titulo = document.getElementById('auth-titulo');
const subtitulo = document.getElementById('auth-subtitulo');
const btnAuth = document.getElementById('btn-auth');
const textoAlterno = document.getElementById('texto-alterno');
const formAuth = document.getElementById('auth-form');

function conmutarModo() {
    esLogin = !esLogin;
    if (esLogin) {
        titulo.textContent = "Iniciar Sesión";
        subtitulo.textContent = "Ingresa tus credenciales para acceder a tus tareas";
        btnAuth.textContent = "Ingresar";
        textoAlterno.innerHTML = `¿No tienes cuenta? <span id="btn-cambiar-modo">Regístrate aquí</span>`;
    } else {
        titulo.textContent = "Crear Cuenta";
        subtitulo.textContent = "Regístrate de forma gratuita para no perder tus datos";
        btnAuth.textContent = "Registrarse";
        textoAlterno.innerHTML = `¿Ya tienes cuenta? <span id="btn-cambiar-modo">Inicia sesión aquí</span>`;
    }
    document.getElementById('btn-cambiar-modo').onclick = conmutarModo;
}

const btnCambiarInicial = document.getElementById('btn-cambiar-modo');
if (btnCambiarInicial) btnCambiarInicial.onclick = conmutarModo;

// 4. PROCESAR EL REGISTRO O INICIO DE SESIÓN REAL EN LA NUBE
formAuth.onsubmit = async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    btnAuth.disabled = true;
    btnAuth.textContent = "Procesando...";

    try {
        if (esLogin) {
            await signInWithEmailAndPassword(auth, email, password);
            alert("¡Sesión iniciada con éxito!");
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("¡Cuenta creada con éxito en la nube!");
        }
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error de autenticación:", error);
        if (error.code === "auth/weak-password") {
            alert("La contraseña debe tener al menos 6 caracteres.");
        } else if (error.code === "auth/email-already-in-use") {
            alert("Este correo ya está registrado. Intenta iniciar sesión.");
        } else if (error.code === "auth/invalid-credential") {
            alert("Correo o contraseña incorrectos. Verifica tus datos.");
        } else {
            alert("Error: " + error.message);
        }
    } finally {
        btnAuth.disabled = false;
        btnAuth.textContent = esLogin ? "Ingresar" : "Registrarse";
    }
};
