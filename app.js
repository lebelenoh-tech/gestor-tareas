// ESTADO LOCAL DE LA APLICACIÓN
let tareas = [];
let idIntervalo = null;
let segundosTranscurridos = 0;
let idTareaActiva = null;

// ELEMENTOS DEL DOM
const inputTarea = document.getElementById('nombre-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');
const reloj = document.getElementById('reloj');

const btnIniciar = document.getElementById('btn-iniciar');
const btnPausar = document.getElementById('btn-pausar');
const btnTerminar = document.getElementById('btn-terminar');

// COMPROBACIÓN DE BOTONES
console.log("Elementos cargados:", { inputTarea, btnAgregar, listaTareas });

// REFRESCAR LA LISTA EN PANTALLA
function renderizarTareas() {
    listaTareas.innerHTML = "";
    
    if (tareas.length === 0) {
        listaTareas.innerHTML = `<li style="color: #7f8c8d; list-style: none; padding: 10px 0;">No hay tareas agregadas.</li>`;
        return;
    }

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `item-tarea ${idTareaActiva === tarea.id ? 'activa' : ''}`;
        li.style.cursor = "pointer";
        
        li.innerHTML = `
            <span>${tarea.nombre}</span>
            <span class="tiempo">${formatearTiempo(tarea.tiempoTotal)}</span>
        `;
        
        li.onclick = () => seleccionarTarea(tarea.id);
        listaTareas.appendChild(li);
    });
}

// AGREGAR UNA NUEVA TAREA
function agregarTarea() {
    const nombre = inputTarea.value.trim();
    if (nombre === "") {
        alert("Por favor, escribe el nombre de una tarea.");
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        nombre: nombre,
        tiempoTotal: 0
    };

    tareas.push(nuevaTarea);
    inputTarea.value = ""; 
    renderizarTareas();
    console.log("Tarea agregada con éxito:", nuevaTarea);
}

// SELECCIONAR TAREA
function seleccionarTarea(id) {
    if (idIntervalo) {
        alert("Pausa el temporizador antes de cambiar de tarea.");
        return;
    }
    idTareaActiva = id;
    segundosTranscurridos = 0;
    reloj.textContent = "00:00:00";
    renderizarTareas();
}

// MANEJO DEL TIEMPO
function formatearTiempo(segundosTotales) {
    const hrs = Math.floor(segundosTotales / 3600);
    const mins = Math.floor((segundosTotales % 3600) / 60);
    const segs = segundosTotales % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(segs)}`;
}

function iniciarTimer() {
    if (!idTareaActiva) {
        alert("Haz clic en una tarea de la lista para activarla antes de iniciar.");
        return;
    }
    btnIniciar.disabled = true;
    btnPausar.disabled = false;
    btnTerminar.disabled = false;

    idIntervalo = setInterval(() => {
        segundosTranscurridos++;
        reloj.textContent = formatearTiempo(segundosTranscurridos);
    }, 1000);
}

function pausarTimer() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
}

function terminarTimer() {
    if (!idIntervalo && segundosTranscurridos === 0) return;
    
    clearInterval(idIntervalo);
    idIntervalo = null;

    const tarea = tareas.find(t => t.id === idTareaActiva);
    if (tarea) {
        tarea.tiempoTotal += segundosTranscurridos;
    }

    segundosTranscurridos = 0;
    reloj.textContent = "00:00:00";
    
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
    btnTerminar.disabled = true;
    
    renderizarTareas();
}

// ASIGNAR EVENTOS
btnAgregar.onclick = agregarTarea;
inputTarea.onkeypress = (e) => {
    if (e.key === 'Enter') agregarTarea();
};

btnIniciar.onclick = iniciarTimer;
btnPausar.onclick = pausarTimer;
btnTerminar.onclick = terminarTimer;

// INICIALIZACIÓN
renderizarTareas();
