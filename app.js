// 1. IMPORTAR COMPONENTES DE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Tu configuración real de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCxchafesCKf2dzb2LQAmooa4yU8w0S-0",
    authDomain: "productividad-timer-db.firebaseapp.com",
    projectId: "productividad-timer-db",
    storageBucket: "productividad-timer-db.firebasestorage.app",
    messagingSenderId: "660058647839",
    appId: "1:660058647839:web:2d0d333cd77481915dd42a",
    measurementId: "G-ZE9PC1J0KG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 2. ESTADO LOCAL Y DOM
let tareas = [];
let usuarioActual = null;

const inputTarea = document.getElementById('nombre-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');

// 3. VERIFICAR SI HAY UN USUARIO INICIADO DE VERDAD
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si hay usuario, guardamos sus datos y cargamos SUS tareas personales
        usuarioActual = user;
        console.log("Usuario autenticado:", user.email);
        cargarTareasDesdeNube();
    } else {
        // Si no está logueado, lo mandamos directo a la pantalla de login
        console.log("No hay sesión activa. Redirigiendo a auth.html...");
        window.location.href = "auth.html";
    }
});

// 4. RENDERIZAR TAREAS EN PANTALLA
function renderizarTareas() {
    listaTareas.innerHTML = "";
    if (tareas.length === 0) {
        listaTareas.innerHTML = "<li style='color: #7f8c8d; padding: 10px;'>No hay tareas todavía.</li>";
        return;
    }
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = "item-tarea";
        li.style.padding = "12px";
        li.style.background = "#f8f9fa";
        li.style.marginBottom = "8px";
        li.style.borderRadius = "6px";
        li.style.display = "flex";
        li.style.justify = "space-between";
        li.innerHTML = `<span>${tarea.nombre}</span> <span class="tiempo">00:00:00</span>`;
        listaTareas.appendChild(li);
    });
}

// 5. CARGAR SOLO LAS TAREAS DEL USUARIO LOGUEADO
async function cargarTareasDesdeNube() {
    if (!usuarioActual) return;
    
    try {
        // Hacemos una consulta filtrando para traer solo las tareas que pertenezcan al UID del usuario activo
        const q = query(collection(db, "tareas"), where("usuarioId", "==", usuarioActual.uid));
        const querySnapshot = await getDocs(q);
        
        tareas = [];
        querySnapshot.forEach((doc) => {
            tareas.push(doc.data());
        });
        renderizarTareas();
    } catch (e) {
        console.error("Error cargando datos: ", e);
    }
}

// 6. GUARDAR NUEVA TAREA ASOCIADA AL USUARIO
async function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (texto === "" || !usuarioActual) return;

    btnAgregar.disabled = true;
    btnAgregar.textContent = "Guardando...";

    const nuevaTarea = {
        nombre: texto,
        tiempoTotal: 0,
        fecha: Date.now(),
        usuarioId: usuarioActual.uid // Guardamos el ID único de tu cuenta
    };

    try {
        await addDoc(collection(db, "tareas"), nuevaTarea);
        inputTarea.value = "";
        await cargarTareasDesdeNube();
    } catch (error) {
        console.error("Error al guardar en la nube:", error);
        alert("Error de permisos: Asegúrate de iniciar sesión.");
    } finally {
        btnAgregar.disabled = false;
        btnAgregar.textContent = "Agregar Tarea";
    }
}

// ASIGNAR CLICS
btnAgregar.onclick = agregarTarea;
inputTarea.onkeypress = (e) => {
    if (e.key === 'Enter') agregarTarea();
};
