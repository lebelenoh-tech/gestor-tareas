// 1. ARREGLO DE TAREAS
let tareas = [];

// 2. ELEMENTOS DEL DOM
const inputTarea = document.getElementById('nombre-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');

// 3. FUNCIÓN PARA MOSTRAR LAS TAREAS EN PANTALLA
function renderizarTareas() {
    listaTareas.innerHTML = ""; // Limpiar lista
    
    if (tareas.length === 0) {
        listaTareas.innerHTML = "<li style='color: #7f8c8d; padding: 10px;'>No hay tareas todavía.</li>";
        return;
    }

    tareas.forEach((tarea) => {
        const li = document.createElement('li');
        li.className = "item-tarea";
        li.style.display = "flex";
        li.style.justify = "space-between";
        li.style.padding = "12px";
        li.style.background = "#f8f9fa";
        li.style.marginBottom = "8px";
        li.style.borderRadius = "6px";
        li.style.borderLeft = "5px solid #bdc3c7";
        
        li.innerHTML = `
            <span>${tarea.nombre}</span>
            <span class="tiempo">00:00:00</span>
        `;
        listaTareas.appendChild(li);
    });
}

// 4. FUNCIÓN PARA ACCIONAR EL BOTÓN
function agregarTarea() {
    const texto = inputTarea.value.trim();
    
    if (texto === "") {
        alert("Por favor, escribe un nombre para la tarea.");
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        nombre: texto
    };

    tareas.push(nuevaTarea);
    inputTarea.value = ""; // Limpiar el campo de texto
    renderizarTareas();    // Dibujar en pantalla
}

// 5. ASIGNAR LOS EVENTOS DIRECTAMENTE
btnAgregar.onclick = agregarTarea;

inputTarea.onkeypress = function(e) {
    if (e.key === 'Enter') {
        agregarTarea();
    }
};

// Cargar la lista inicial vacía al abrir la página
renderizarTareas();
