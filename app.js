// 1. ARREGLO PARA ALMACENAR LAS TAREAS EN MEMORIA LOCAL
let tareas = [];

// 2. CAPTURAR ELEMENTOS DEL HTML
const inputTarea = document.getElementById('nombre-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');

// 3. FUNCIÓN PARA DIBUJAR LAS TAREAS EN LA PÁGINA
function renderizarTareas() {
    listaTareas.innerHTML = ""; // Limpiar la lista visual antes de redibujar
    

cat << 'EOF' > app.js
// 1. ARREGLO PARA ALMACENAR LAS TAREAS EN MEMORIA LOCAL
let tareas = [];

// 2. CAPTURAR ELEMENTOS DEL HTML
const inputTarea = document.getElementById('nombre-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');

// 3. FUNCIÓN PARA DIBUJAR LAS TAREAS EN LA PÁGINA
function renderizarTareas() {
    listaTareas.innerHTML = ""; // Limpiar la lista visual antes de redibujar
    
    if (tareas.length === 0) {
        listaTareas.innerHTML = "<li style='color: #7f8c8d; padding: 10px; list-style: none;'>No hay tareas todavía.</li>";
        return;
    }

    // Recorrer el arreglo y crear los elementos de la lista
    tareas.forEach((tarea) => {
        const li = document.createElement('li');
        li.className = "item-tarea";
        li.style.display = "flex";
        li.style.justify = "space-between";
        li.style.padding = "12px";
        li.style.background = "#f8f9fa";
        li.style.marginBottom = "8px";
        li.style.borderRadius = "6px";
        li.style.borderLeft = "5px solid #3498db";
        
        li.innerHTML = `
            <span style='font-weight: 500; color: #2c3e50;'>${tarea.nombre}</span>
            <span class="tiempo" style='color: #7f8c8d;'>00:00:00</span>
        `;
        listaTareas.appendChild(li);
    });
}

// 4. FUNCIÓN PARA AGREGAR LA TAREA AL ARREGLO
function agregarTarea() {
    const texto = inputTarea.value.trim();
    
    // Validar que el campo no esté vacío
    if (texto === "") {
        alert("Por favor, escribe un nombre para la tarea.");
        return;
    }

    // Crear el objeto de la nueva tarea
    const nuevaTarea = {
        id: Date.now(),
        nombre: texto
    };

    // Empujar la tarea al arreglo local
    tareas.push(nuevaTarea);
    
    // Limpiar la caja de texto y actualizar la interfaz
    inputTarea.value = "";
    renderizarTareas();
}

// 5. ASIGNACIÓN DE EVENTOS TRADICIONALES
btnAgregar.onclick = agregarTarea;

// Permitir agregar la tarea también al presionar la tecla Enter
inputTarea.onkeypress = function(e) {
    if (e.key === 'Enter') {
        agregarTarea();
    }
};

// Carga inicial al abrir la página por primera vez
renderizarTareas();
