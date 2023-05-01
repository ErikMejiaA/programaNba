import { Jugador } from "../app/Jugador.js";
let jugadores = [];
let equipos = [];
let cargarJugadores = [];
export { FrmJugadores };
class FrmJugadores extends HTMLElement {
    constructor(){
        super();
        this.formulario();
        this.llenarSelectEquipos();
        this.guardarDatosJugador();
        this.registroJugadores();
        this.listaDeJugadores();
        this.escojerSelectEquipos();
        this.limpiarDatoJugadores()

        //localStorage.removeItem("jugadores");

        if (localStorage.getItem("jugadores") != null){
            jugadores = JSON.parse(localStorage.getItem("jugadores"));
            //console.log(jugadores)
        }

    }
    formulario() {
        this.innerHTML = /* html */`
        <h1>Gestor de Jugadores</h1>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" id="registroJugadores" data-verocultar='["#jugadores", ["#listarJugadores"]]'>Registrar Jugador</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="listaJugadores" data-verocultar='["#listarJugadores", ["#jugadores"]]'>Listar Jugadores</a>
          </li>
        </ul>
        <div id="juga">
            <div class="container mt-3" id="jugadores">
                <div class="card">
                    <div class="card-header">
                        Jugadores <span class="badge bg-secondary" id="spanIdJugador"></span>
                    </div>
                    <div class="container">
                        <form id="datosJugador">
                            <div class="container">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="txtNombreJugador" class="form-label">Nombre del Jugador:</label>
                                            <input type="text" class="form-control" id="txtNombreJugador">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtNombreDelEquipo" class="form-label">Nombre del Equipo:</label>
                                            <select class="form-select" aria-label="Default select example" id="txtNombreDelEquipo">
                                                <option selected>Seleccione el equipo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-5">
                                        <div class="mb-3">
                                            <label for="txtFotoJugador" class="form-label">Foto del Jugador:</label>
                                            <input type="file" class="form-control" id="txtFotoJugador">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtFechaJugador" class="form-label">Fecha de Compra:</label>
                                            <input type="date" class="form-control" id="txtFechaJugador">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtEmailJugador" class="form-label">Email:</label>
                                            <input type="email" class="form-control" id="txtEmailJugador">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtCiudadJugador" class="form-label">Ciudad:</label>
                                            <input type="text" class="form-control" id="txtCiudadJugador"/>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtYearsJugador" class="form-label">Años de Experiencia:</label>
                                            <input type="number" class="form-control" id="txtYearsJugador" min="0"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtDorsal" class="form-label">Dorsal</label>
                                            <input type="number" class="form-control" id="txtDorsal" min="0"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="txtPosicion" class="form-label">Posicion de juego:</label>
                                            <select class="form-select" aria-label="Default select example" id="txtPosicion">
                                                <option selected>Seleccione la posicion</option>
                                                <option>BASE (Point Guard, Playmaker)</option>
                                                <option>ESCOLTA (Alero Bajo, Shooting Guard)</option>
                                                <option>ALERO (Alero Alto, Small Forward)</option>
                                                <option>ALA-PIVOT (Power Forward)</option>
                                                <option>PIVOT (Center)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtEstatura" class="form-label">Estatura (cm):</label>
                                            <input type="number" class="form-control" id="txtEstatura" min="0.0">
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtPeso" class="form-label">Peso (Kg):</label>
                                            <input type="number" class="form-control" id="txtPeso" min="0.0"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtTiempoJugado" class="form-label">Tiempo Jugado (min):</label>
                                            <input type="number" class="form-control" id="txtTiempoJugado" min="0.0"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtFaltas" class="form-label">Faltas:</label>
                                            <input type="number" class="form-control" id="txtFaltas" min="0"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtAsistencias" class="form-label">Asistencias:</label>
                                            <input type="number" class="form-control" id="txtAsistencias" min="0"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtPuntosAnotados" class="form-label">Puntos Anotados:</label>
                                            <input type="number" class="form-control" id="txtPuntosAnotados" min="0"/>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="mb-3">
                                            <label for="txtValor" class="form-label">Valor:</label>
                                            <input type="number" class="form-control" id="txtValor" min="0"/>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="txtNivelExperiencia" class="form-label">Nivel de experiencia:</label>
                                            <select class="form-select" aria-label="Default select example" id="txtNivelExperiencia">
                                                <option selected>Seleccione su nivel</option>
                                                <option>BASICO</option>
                                                <option>INTERMEDIO</option>
                                                <option>AVANZADO</option>
                                            </select>
                                            <!--<p class="text-center"><span id="rangeValue"></span></p>-->
                                            <!--<input type="range" class="form-range" id="txtNivelExperiencia" value="0" min="0" max="100"/>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" id="guardarJugador">GUARDAR</button>
                            <button type="submit" class="btn btn-primary" id="limpiarDatosjugador">LIMPIAR DATOS</button>
                        </form>
                    </div>      
                </div>
            </div>
            <div class="container" id="listarJugadores" style="display:none;">
                <h2 class="text-center">Listado de jugadores registrados en el torneo</h2>
                <div class="row">
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                        <div class="mb-3">
                            <label for="txtNombreDelEquipoEscojer" class="form-label">Ingrese el nombre del equipo, para saber que jugadores lo conforman:</label>
                            <select class="form-select" aria-label="Default select example" id="txtNombreDelEquipoEscojer">
                                <option selected>Seleccione el equipo</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                    </div>
                </div>

                <div class="row" id="listarJugadoress">

                </div>
            </div>
        </div>
        `
    }
    //falta mirar el slider de la experiencia del jugador

    // funcion para hacer el llenado del select con el nombre de los equipos
    llenarSelectEquipos = () => {
        this.borrarSelect('#txtNombreDelEquipo');
        const selectEquipo = document.querySelector('#txtNombreDelEquipo');
        const crearSelect = document.createElement('option');
        crearSelect.innerHTML = "Seleccione el equipo";
        crearSelect.selected;
        selectEquipo.appendChild(crearSelect);
        equipos = JSON.parse(localStorage.getItem("equipos"));

        equipos.forEach(itemEquipo => {
            let itemDato = document.createElement('option');
            itemDato.value = itemEquipo._id;
            itemDato.innerHTML = itemEquipo._nombre;
            selectEquipo.appendChild(itemDato);
        });    
    }

    // funcion para hacer el llenado del select con el nombre de los equipos para escojer que jugadores pertenecen a este equipo.
    escojerSelectEquipos = () => {
        this.borrarSelect('#txtNombreDelEquipoEscojer');
        const selectEquipo = document.querySelector('#txtNombreDelEquipoEscojer');
        const crearSelect = document.createElement('option');
        crearSelect.innerHTML = "Seleccione el equipo";
        crearSelect.selected;
        selectEquipo.appendChild(crearSelect);
        equipos = JSON.parse(localStorage.getItem("equipos"));

        equipos.forEach(itemEquipo => {
            let itemDato = document.createElement('option');
            itemDato.value = itemEquipo._id;
            itemDato.innerHTML = itemEquipo._nombre;
            selectEquipo.appendChild(itemDato);
        });    
    }

    //funcion para borrar el select
    borrarSelect = (seleccion) => {
        const selectDato = document.querySelector(seleccion);
        let opcion = selectDato.querySelectorAll('option');
        opcion.forEach(dato => {
            selectDato.removeChild(dato);
        });
    }

     //funcion para el registro de los jugadores
     registroJugadores = () => {
        document.querySelector('#registroJugadores').addEventListener('click', (e) => {
            document.querySelector('#juga').style.display = "block";
            let dato = JSON.parse(e.target.dataset.verocultar);
            let verRegistro = document.querySelector(dato[0])
            verRegistro.style.display = "block";
            dato[1].forEach(itemCard => {
                let oculatarLista = document.querySelector(itemCard);
                oculatarLista.style.display = "none";
            });

            let limpiarSelect = document.querySelector('#txtNombreDelEquipoEscojer');
            limpiarSelect.value = 'Seleccione el equipo';

            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //guardando los datos de los jugadores...
    guardarDatosJugador = () => {
        document.querySelector('#guardarJugador').addEventListener('click', (e) => {
            const frmDatosJugador = document.querySelector('#datosJugador');
            const idJugador = document.querySelector('#spanIdJugador');

            let txtNombreJugador = frmDatosJugador["txtNombreJugador"];
            let txtNombreDelEquipo = frmDatosJugador["txtNombreDelEquipo"];
            let txtFotoJugador = frmDatosJugador["txtFotoJugador"];
            let txtFechaJugador = frmDatosJugador["txtFechaJugador"];
            let txtEmailJugador = frmDatosJugador["txtEmailJugador"];
            let txtCiudadJugador = frmDatosJugador["txtCiudadJugador"];
            let txtYearsJugador = frmDatosJugador["txtYearsJugador"];
            let txtDorsal = frmDatosJugador["txtDorsal"];
            let txtPosicion = frmDatosJugador["txtPosicion"];
            let txtEstatura = frmDatosJugador["txtEstatura"];
            let txtPeso = frmDatosJugador["txtPeso"];
            let txtTiempoJugado = frmDatosJugador["txtTiempoJugado"];
            let txtFaltas = frmDatosJugador["txtFaltas"];
            let txtAsistencias = frmDatosJugador["txtAsistencias"];
            let txtPuntosAnotados = frmDatosJugador["txtPuntosAnotados"];
            let txtValor = frmDatosJugador["txtValor"];
            let txtNivelExperiencia = frmDatosJugador["txtNivelExperiencia"];

            let jugador = new Jugador(this.dateToJulian(new Date()), txtNombreJugador.value, txtFechaJugador.value, txtEmailJugador.value, txtCiudadJugador.value, txtYearsJugador.value, txtDorsal.value, txtPosicion.value, txtEstatura.value, txtPeso.value, txtTiempoJugado.value, txtFaltas.value, txtAsistencias.value, txtPuntosAnotados.value, txtValor.value, txtNivelExperiencia.value, txtFotoJugador.files[0].name,txtNombreDelEquipo.value, txtNombreDelEquipo.options[txtNombreDelEquipo.selectedIndex].text);

            jugadores.push(jugador);
            //guardamos los datos en el local Storage
            localStorage.setItem("jugadores", JSON.stringify(jugadores))

            idJugador.innerHTML = jugador.id;
            console.log(jugadores);
            e.stopImmediatePropagation();
            e.preventDefault();
            alert("EL JUGADOR SE GUARDO EXITOSAMENE");
        });
    }

    //Fecha julian para el del ID del jugador
    dateToJulian = (date) => {
        // UTC tiempo en milisegundos 
        let utcMilisegundos = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        //pasando a hexadecimal
        return utcMilisegundos.toString(16);
    }

    //funcion para ver la lista de los jugadores registrados
    listaDeJugadores = () => {
        document.querySelector('#listaJugadores').addEventListener('click', (e) => {
            
            document.querySelector('#juga').style.display = "block";
            
            let ocultarTargeta = document.querySelector('#listarJugadoress');
            ocultarTargeta.style.display = "none";

            let dato = JSON.parse(e.target.dataset.verocultar);
            let verRegistro = document.querySelector(dato[0]);
            verRegistro.style.display = "block";
            dato[1].forEach(itemCard => {
                let ocultarLista = document.querySelector(itemCard);
                ocultarLista.style.display = "none";
            });
            //limpiar el formulario del equipo----------------------------
            const frmDatosEquipo = document.querySelector('#datosJugador');
            for (let frmItem of frmDatosEquipo) {
                switch (frmItem.id) {
                    case 'txtNombreDelEquipo':
                        frmItem.value = 'Seleccione su equipo';
                        break;
                    case 'txtPosicion':
                        frmItem.value = 'Seleccione la posicion'
                        break;
                    case 'txtNivelExperiencia':
                        frmItem.value = 'Seleccione su nivel'
                        break;
                    default:
                        frmItem.value = '';
                        break;
                }
            }
            //------------------------------------------------------------
            this.selectCargarJugador();
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //funcion para caragar los juagadores segun el equipo selecionado
    selectCargarJugador = () => {
        document.querySelector('#txtNombreDelEquipoEscojer').addEventListener('change', (e) => {

            let equipoExiste = jugadores.some(equipoItem => equipoItem._idEquipo === e.target.value);
            
            if (equipoExiste) {

                let ocultarTargeta = document.querySelector('#listarJugadoress');
                ocultarTargeta.style.display = "flex";

                cargarJugadores = jugadores.filter(element => element._idEquipo === e.target.value);
                console.log(jugadores);

                this.cargarLIstaJugadores();
                this.eliminarjugadorLista();

            } else {
                alert("NO HAY JUGADORES DENTRO DEL EQUIPO INGRESADO");
            }
            
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //funcion para cargar la lista de los juagadores
    cargarLIstaJugadores = () => {
        let jugadoresHTML = '';
        for (let jugador of cargarJugadores) {
            jugadoresHTML += this.crearListaJugador(jugador);   
        }
        document.querySelector('#listarJugadoress').innerHTML = jugadoresHTML;
    }

    //creamos la trageta para cada uno de los jugadores
    crearListaJugador = (jugador) => {
        let jugadoresHTML = /* html */ `
            <div class="col-auto" id="ocultarTargeta">
                <div class="card" style="width: 20rem;" class="object-fit: cover;">
                    <div class="carb-body text-center mt-3" style="height: 10rem;">
                        <img src="imagenes/mascotas/${jugador._foto}" class="card-img-top" alt="logo del Jugador" style="max-height: 100%; width: auto;"/>
                    </div>
                    <div class="card-body text-center" style="aling-items: center;">
                        <h4 class="card-title">${jugador._nombre}</h4>
                        <h5 class="card-text">${jugador._ciudad}</h5>
                        <h5 class="card-text">${jugador._nombreEquipo}</h5>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jugador${jugador._id}">VER MAS</button>
                        <button type="button" class="btn btn-primary eliminarJugador" id="${jugador._id}">ELIMINAR</button>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade text-center" id="jugador${jugador._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2 class="modal-title" id="staticBackdropLabel">MAS SOBRE EL JUGADOR</h2>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="container text-center">
                                        <div class="row">
                                            <div class="col-4">
                                                Id Jugador:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._id}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Id Equipo:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._idEquipo}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Fecha de Compra:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._fecha}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Email:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._email}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Años de Experiencia:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._year}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Dorsal:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._dorsal}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Posicion de Juego:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._posicion}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Estatura (cm):
                                            </div>
                                            <div class="col-6">
                                                ${jugador._estatura}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Peso (kg):
                                            </div>
                                            <div class="col-6">
                                                ${jugador._peso}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Tiempo Jugado (min):
                                            </div>
                                            <div class="col-6">
                                                ${jugador._tiempoJugado}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Faltas:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._faltas}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Asistencias:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._asistencia}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Puntos Anotados:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._puntosAnotados}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Valor:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._valor}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                Nivel de Experiencia:
                                            </div>
                                            <div class="col-6">
                                                ${jugador._nivelExp}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CERRAR VENTANA</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <br/> 
            </div> 
        `;
        return jugadoresHTML;
    } 

    //funcion para limpiar el formulario de jugadores
    limpiarDatoJugadores = () => {
        document.querySelector('#limpiarDatosjugador').addEventListener('click', (e) => {
            const frmDatosEquipo = document.querySelector('#datosJugador');
            for (let frmItem of frmDatosEquipo) {
                switch (frmItem.id) {
                    case 'txtNombreDelEquipo':
                        frmItem.value = 'Seleccione su equipo';
                        break;
                    case 'txtPosicion':
                        frmItem.value = 'Seleccione la posicion'
                        break;
                    case 'txtNivelExperiencia':
                        frmItem.value = 'Seleccione su nivel'
                        break;
                    default:
                        frmItem.value = '';
                        break;
                }
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //funcion para eliminar un jugador de la lista de jugadores 
    eliminarjugadorLista = () => {
        document.querySelectorAll(".eliminarJugador").forEach((val, indi) => {
            val.addEventListener('click', (e) => {
                let targeta = document.querySelectorAll('#ocultarTargeta');
                console.log(e.target.id);
                jugadores = JSON.parse(localStorage.getItem("jugadores"));

                jugadores.forEach((divData, posi) => {
                    if (divData._id === e.target.id) {
                        console.log(divData);
                        jugadores.splice(posi, 1);//eliminar un objeto del array objeto equipo
                        targeta[indi].style.display = "none";
                        localStorage.setItem("jugadores", JSON.stringify(jugadores));
                        console.log(jugadores);
                    }
                });

                cargarJugadores.forEach((divData, posi) => {
                    if (divData._id === e.target.id) {
                        console.log(divData);
                        cargarJugadores.splice(posi, 1);//eliminar un objeto del array objeto equipo
                        targeta[indi].style.display = "none";
                    }
                });

                this.cargarLIstaJugadores();
                
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        });    
    }
}
customElements.define('frm-jugadores-nba', FrmJugadores);