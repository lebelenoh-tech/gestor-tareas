let esLogin = true;

const titulo = document.getElementById('auth-titulo');
const subtitulo = document.getElementById('auth-subtitulo');
const btnAuth = document.getElementById('btn-auth');
const textoAlterno = document.getElementById('texto-alterno');
const btnCambiarModo = document.getElementById('btn-cambiar-modo');
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
    // Volver a asignar el evento ya que reescribimos el innerHTML
    document.getElementById('btn-cambiar-modo').onclick = conmutarModo;
}

btnCambiarModo.onclick = conmutarModo;

formAuth.onsubmit = function(e) {
    e.preventDefault();
    if (esLogin) {
        alert("¡Sesión iniciada con éxito!");
    } else {
        alert("¡Cuenta creada con éxito!");
    }
    window.location.href = "index.html";
};
