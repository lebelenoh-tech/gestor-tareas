// 1. ESTADO DE LA APLICACIÓN
let tareas = [];
let tareaActiva = null;
let idIntervalo = null;
let segundosTranscurridos = 0;

// 2. ELEMENTOS DEL DOM
const inputTarea = document.getElementById('nombre-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');
const reloj = document.getElementById('reloj');

const btnIniciar = document.getElementById('btn-iniciar');
const btnPausar = document.getElementById('btn-pausar');
const btnTerminar = document.getElementById('btn-terminar');

// 3. FUNCIONES DEL TEMPORIZADOR
function formatearTiempo(segundosTotales) {
    const hrs = Math.floor(segundosTotales / 3600);
    const mins = Math.floor((segundosTotales % 3600) / 60);
    const segs = segundosTotales % 60;
    
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(segs)}`;
}

function actualizarRelojEnPantalla() {
    reloj.textContent = formatearTiempo(segundosTranscurridos);
}

function iniciarTimer() {
    if (!tareaActiva) {
        alert("Por favor, selecciona o agrega una tarea primero haciendo clic en ella.");
        return;
    }
    
    btnIniciar.disabled = true;
    btnPausar.disabled = false;
    btnTerminar.disabled = false;

    idIntervalo = setInterval(() => {
        segundosTranscurridos++;
        actualizarRelojEnPantalla();
    }, 1000);
}

function pausarTimer() {
    clearInterval(idIntervalo);
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
}

function terminarTimer() {
    clearInterval(idIntervalo);
    
    // Guardar el tiempo acumulado en la tarea activa
    if (tareaActiva) {
        tareaActiva.tiempoTotal += segundosTranscurridos;
        tareaActiva.estado = 'pendiente'; // Libera el estado de proceso
    }

    // Reiniciar variables del reloj
    segundosTranscurridos = 0;
    tareaActiva = null;
    actualizarRelojEnPantalla();
    renderizarTareas();

    // Bloquear botones de control hasta elegir otra tarea
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
    btnTerminar.disabled = true;
    
    document.querySelectorAll('.item-tarea').forEach(el => el.classList.remove('activa'));
}

// 4. GESTIÓN DE TAREAS
function agregarTarea() {
    const nombre = inputTarea.value.trim();
    if (nombre === "") return;

    const nuevaTarea = {
        id: Date.now(),
        nombre: nombre,
        tiempoTotal: 0,
        estado: 'pendiente'
    };

    tareas.push(nuevaTarea);
    inputTarea.value = ""; // Limpiar input
    renderizarTareas();
}

function seleccionarTarea(id, elementoDOM) {
    // Si el reloj está corriendo, no dejamos cambiar de tarea bruscamente
    if (idIntervalo && btnIniciar.disabled) {
        alert("Pausa o termina la tarea actual antes de cambiar.");
        return;
    }

    // Buscar la tarea seleccionada
    tareaActiva = tareas.find(t => t.id === id);
    
    // Cambiar estilos visuales en la lista
    document.querySelectorAll('.item-tarea').forEach(el => el.classList.remove('activa'));
    elementoDOM.classList.add('activa');
    
    // Resetear el segundero local para esta nueva sesión de enfoque
    segundosTranscurridos = 0;
    actualizarRelojEnPantalla();
}

function renderizarTareas() {
    listaTareas.innerHTML = "";
    
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `item-tarea ${tareaActiva && tareaActiva.id === tarea.id ? 'activa' : ''}`;
        
        li.innerHTML = `
            <span>${tarea.nombre}</span>
            <span class="tiempo">${formatearTiempo(tarea.tiempoTotal)}</span>
        `;
        
        // Evento para seleccionar la tarea al hacer clic
        li.addEventListener('click', () => seleccionarTarea(tarea.id, li));
        
        listaTareas.appendChild(li);
    });
}

// 5. EVENT LISTENERS
btnAgregar.addEventListener('click', agregarTarea);
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarTarea();
});

btnIniciar.addEventListener('click', iniciarTimer);
btnPausar.addEventListener('click', pausarTimer);
btnTerminar.addEventListener('click', terminarTimer);
