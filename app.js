// 1. IMPORTAR COMPONENTES DE FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Tu configuración real que me compartiste
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
const db = getFirestore(app);

// 2. ESTADO LOCAL Y DOM
let tareas = [];
const inputTarea = document.getElementById('nombre-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');

// 3. RENDERIZAR TAREAS
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

// 4. CARGAR TAREAS DESDE FIREBASE AL INICIAR
async function cargarTareasDesdeNube() {
    try {
        const querySnapshot = await getDocs(collection(db, "tareas"));
        tareas = [];
        querySnapshot.forEach((doc) => {
            tareas.push(doc.data());
        });
        renderizarTareas();
    } catch (e) {
        console.error("Error cargando datos: ", e);
    }
}

// 5. GUARDAR NUEVA TAREA EN LA NUBE REAL
async function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (texto === "") return;

    btnAgregar.disabled = true;
    btnAgregar.textContent = "Guardando...";

    const nuevaTarea = {
        nombre: texto,
        tiempoTotal: 0,
        fecha: Date.now()
    };

    try {
        // Esto lo manda directo a tu cuenta de Google Firebase en internet
        await addDoc(collection(db, "tareas"), nuevaTarea);
        inputTarea.value = "";
        await cargarTareasDesdeNube(); // Recargar de la nube
    } catch (error) {
        console.error("Error al guardar en la nube:", error);
        alert("No se pudo guardar en internet.");
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

// Carga inicial al abrir la página
cargarTareasDesdeNube();
