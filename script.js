
let tareas = JSON.parse(localStorage.getItem("tareasStudyHelp")) || [];

let filtroActual = "todas";

const formulario = document.getElementById("formularioTarea");

const nombreTarea = document.getElementById("nombreTarea");

const materiaTarea = document.getElementById("materiaTarea");

const fechaTarea = document.getElementById("fechaTarea");

const listaTareas = document.getElementById("listaTareas");

const mensajeVacio = document.getElementById("mensajeVacio");

const pendientes = document.getElementById("pendientes");

const completadas = document.getElementById("completadas");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    const nuevaTarea = {

        id: Date.now(),

        nombre: nombreTarea.value,

        materia: materiaTarea.value,

        fecha: fechaTarea.value,

        completada: false

    };


    tareas.push(nuevaTarea);


    guardarTareas();

    mostrarTareas();

    formulario.reset();

});

function guardarTareas() {

    localStorage.setItem(
        "tareasStudyHelp",
        JSON.stringify(tareas)
    );

}

function mostrarTareas() {

    listaTareas.innerHTML = "";


    let tareasFiltradas = tareas;


    if (filtroActual === "pendientes") {

        tareasFiltradas = tareas.filter(
            tarea => !tarea.completada
        );

    }


    if (filtroActual === "completadas") {

        tareasFiltradas = tareas.filter(
            tarea => tarea.completada
        );

    }


    if (tareasFiltradas.length === 0) {

        listaTareas.innerHTML = `
            <p class="mensaje-vacio">
                No hay tareas para mostrar 😊
            </p>
        `;

    }


    tareasFiltradas.forEach(function(tarea) {

        const elemento = document.createElement("div");

        elemento.classList.add("tarea");


        if (tarea.completada) {

            elemento.classList.add("completada");

        }


        elemento.innerHTML = `

            <div class="info-tarea">

                <input
                    type="checkbox"
                    class="check"
                    ${tarea.completada ? "checked" : ""}
                    onchange="cambiarEstado(${tarea.id})"
                >

                <div class="detalles">

                    <h3>
                        ${tarea.nombre}
                    </h3>

                    <p>
                        📚 ${tarea.materia}
                        &nbsp; | &nbsp;
                        📅 ${formatearFecha(tarea.fecha)}
                    </p>

                </div>

            </div>


            <button
                class="eliminar"
                onclick="eliminarTarea(${tarea.id})"
            >
                🗑️
            </button>

        `;


        listaTareas.appendChild(elemento);

    });


    actualizarContadores();

}
function cambiarEstado(id) {

    tareas = tareas.map(function(tarea) {

        if (tarea.id === id) {

            tarea.completada = !tarea.completada;

        }

        return tarea;

    });


    guardarTareas();

    mostrarTareas();

}
function eliminarTarea(id) {

    tareas = tareas.filter(function(tarea) {

        return tarea.id !== id;

    });
     guardarTareas();

    mostrarTareas();

}
function formatearFecha(fecha) {

    const partes = fecha.split("-");

    return ${partes[2]}/${partes[1]}/${partes[0]};

}
function actualizarContadores() {

    const cantidadPendientes = tareas.filter(
        tarea => !tarea.completada
    ).length;


    const cantidadCompletadas = tareas.filter(
        tarea => tarea.completada
    ).length;


    pendientes.textContent = cantidadPendientes;

    completadas.textContent = cantidadCompletadas;

}
const botonesFiltro = document.querySelectorAll(".filtro");


botonesFiltro.forEach(function(boton) {

    boton.addEventListener("click", function() {


        botonesFiltro.forEach(function(b) {

            b.classList.remove("activo");

        });


        boton.classList.add("activo");


        filtroActual = boton.dataset.filtro;


        mostrarTareas();

    });

});
const botonModo = document.getElementById("modoOscuro");


botonModo.addEventListener("click", function() {

    document.body.classList.toggle("oscuro");


    if (document.body.classList.contains("oscuro")) {

        botonModo.textContent = "☀️";

    } else {

        botonModo.textContent = "🌙";

    }

});
mostrarTareas();