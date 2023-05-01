import { CuerpoApoyo } from "../app/CuerpoApoyo.js";
export { FrmCuerpoApoyo };
let cuerpoApoyos = [];
let equipos = [];
class FrmCuerpoApoyo extends HTMLElement {
    constructor(){
        super();
        this.formulario();
        this.llenarSelectEquipos();
        this.registroCuerpoApoyo();
        this.guardarDatosApoyo();
        this.listarCuerpoApoyo();
        this.limpiarDatoJugadores();

        //localStorage.removeItem("cuerpoApoyos");
        
        if (localStorage.getItem("cuerpoApoyos") != null){
            cuerpoApoyos = JSON.parse(localStorage.getItem("cuerpoApoyos"));
            //console.log(cuerpoApoyos)
        }
    }
    formulario() {
        this.innerHTML = /* html */ `
        <h1>Gestor de Cuerpo de Apoyo</h1>
        <ul class="nav nav-tabs">
          <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" id="registroCuerpoApoyo" data-verocultar='["#apoyo", ["#listarCuerpoApoyos"]]'>Registrar Cuerpo de Apoyo</a>
          </li>
          <li class="nav-item">
                <a class="nav-link" href="#" id="listaCuerpoApoyo" data-verocultar='["#listarCuerpoApoyos", ["#apoyo"]]'>Listar Cuerpo de Apoyo</a>
          </li>
        </ul>
        <div id="cuer">
            <div class="container mt-5" id="apoyo">
                <div class="card">
                    <div class="card-header">
                        Cuerpo de Apoyo  <span class="badge bg-secondary" id="spanIdApoyo"></span>
                    </div>
                    <div class="container">
                        <form id="datosCuerpoApoyo">
                            <div>
                                <div class="row">
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtNombreCuerApoyo" class="form-label">Nombre</label>
                                            <input type="text" class="form-control" id="txtNombreCuerApoyo">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtFechaCuerApoyo" class="form-label">Fecha</label>
                                            <input type="date" class="form-control" id="txtFechaCuerApoyo">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtEmailCuerApoyo" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="txtEmailCuerApoyo">
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtCiudadCuerApoyo" class="form-label">Ciudad</label>
                                            <input type="text" class="form-control" id="txtCiudadCuerApoyo"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtYearsCuerApoyo" class="form-label">Years</label>
                                            <input type="date" class="form-control" id="txtYearsCuerApoyo"/>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtEspecialidad" class="form-label">Especialidad</label>
                                            <input type="text" class="form-control" id="txtEspecialidad"/>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtCargo" class="form-label">Cargo</label>
                                            <input type="text" class="form-control" id="txtCargo"/>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="mb-3">
                                            <label for="txtTipoApoyo" class="form-label">Tipo de Apoyo</label>
                                            <input type="text" class="form-control" id="txtTipoApoyo" min="0"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="mb-3">
                                            <label for="txtNombreDelEquipo" class="form-label">Nombre del Equipo que Apoya:</label>
                                            <select class="form-select" aria-label="Default select example" id="txtNombreDelEquipo">
                                                <option selected>Seleccione el equipo</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <button type="submit" class="btn btn-primary" id="guardarApoyo">GUARDAR</button>
                        <button type="submit" class="btn btn-primary" id="limpiarDatosCuerpoA">LIMPIAR DATOS</button>
                    </div>
                    <br/>
                </div>
            </div>
            <div class="container" id="listarCuerpoApoyos" style="display:none;">
                <h2 class="text-center">Listado del cuerpo de apoyo</h2>
                <div class="row" id="listaCuerpoApoyos">

                </div>
            </div>
        </div>
        `
    }

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

    //funcion para borrar el select
    borrarSelect = (seleccion) => {
        const selectDato = document.querySelector(seleccion);
        let opcion = selectDato.querySelectorAll('option');
        opcion.forEach(dato => {
            selectDato.removeChild(dato);
        });
    }

    registroCuerpoApoyo = () => {
        document.querySelector('#registroCuerpoApoyo').addEventListener('click', (e) => {
            document.querySelector('#cuer').style.display = "block";
            let datos = JSON.parse(e.target.dataset.verocultar);
            let ver = document.querySelector(datos[0]);
            ver.style.display  = "block";
            datos[1].forEach(element => {
                let ocultar = document.querySelector(element);
                ocultar.style.display = "none"; 
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //llenando los datos del cuerpo de apoyo
    guardarDatosApoyo = () => {
        document.querySelector('#guardarApoyo').addEventListener('click', (e) => {
            const frmDatosApoyo = document.querySelector('#datosCuerpoApoyo');
            const idApoyo = document.querySelector('#spanIdApoyo');

            let txtNombreCuerApoyo = frmDatosApoyo["txtNombreCuerApoyo"];
            let txtFechaCuerApoyo = frmDatosApoyo["txtFechaCuerApoyo"];
            let txtEmailCuerApoyo = frmDatosApoyo["txtEmailCuerApoyo"];
            let txtCiudadCuerApoyo = frmDatosApoyo["txtCiudadCuerApoyo"];
            let txtYearsCuerApoyo = frmDatosApoyo["txtYearsCuerApoyo"];
            let txtEspecialidad = frmDatosApoyo["txtEspecialidad"];
            let txtCargo = frmDatosApoyo["txtCargo"];
            let txtTipoApoyo = frmDatosApoyo["txtTipoApoyo"];
            let txtNombreDelEquipo = frmDatosApoyo["txtNombreDelEquipo"];


            let apoyo = new CuerpoApoyo(this.dateToJulian(new Date()), txtNombreCuerApoyo.value, txtFechaCuerApoyo.value, txtEmailCuerApoyo.value, txtCiudadCuerApoyo.value, txtYearsCuerApoyo.value, txtEspecialidad.value, txtCargo.value, txtTipoApoyo.value, txtNombreDelEquipo.value, txtNombreDelEquipo.options[txtNombreDelEquipo.selectedIndex].text);

            cuerpoApoyos.push(apoyo);
            //guardamos los datos en el local storage
            localStorage.setItem("cuerpoApoyos", JSON.stringify(cuerpoApoyos))

            idApoyo.innerHTML = apoyo.id;
            console.log(cuerpoApoyos);
            
            e.stopImmediatePropagation();
            e.preventDefault();
            alert("EL CUERPO DE APOYO SE GUARDO EXITOSAMENE");
        });
    }

    //Fecha julian para el del ID del jugador
    dateToJulian = (date) => {
        // UTC tiempo en milisegundos 
        let utcMilisegundos = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        //pasando a hexadecimal
        return utcMilisegundos.toString(16);
    }

    listarCuerpoApoyo = () => {
        document.querySelector('#listaCuerpoApoyo').addEventListener('click', (e) => {
            document.querySelector('#cuer').style.display = "block";
            let datos = JSON.parse(e.target.dataset.verocultar);
            let ver = document.querySelector(datos[0]);
            ver.style.display  = "block";
            datos[1].forEach(element => {
                let ocultar = document.querySelector(element);
                ocultar.style.display = "none"; 
            });

            //limpiar el formulario del cuerpo de apoyo-----------------------------------------
            const frmDatosApoyo = document.querySelector('#datosCuerpoApoyo');
            for (let frmItem of frmDatosApoyo) {
                switch (frmItem.id) {
                    case 'txtNombreDelEquipo':
                        frmItem.value = 'Seleccione el equipo';
                        break;
                    default:
                        frmItem.value = '';
                        break;
                }
            }
            //-----------------------------------------------------------------------------------

            this.cargarLIstaCuerpoApoyo();
            this.eliminarjugadorLista();
            
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //funcion para cargar el cuerpo de apoyo 
    cargarLIstaCuerpoApoyo = () => {
        let cuerpoApoyoHTML = '';
        for (let cuerpoApoyo of cuerpoApoyos) {
            cuerpoApoyoHTML += this.crearListaCuerpoApoyo(cuerpoApoyo);   
        }
        document.querySelector('#listaCuerpoApoyos').innerHTML = cuerpoApoyoHTML;
    }

    //creamos la trageta para cada uno del cuerpo de apoyo
    crearListaCuerpoApoyo = (cuerpoApoyo) => {
        let cuerpoApoyoHTML = /* html */ `
            <div class="col-auto" id="ocultarTargeta">
                <div class="card" style="width: 20rem;" class="object-fit: cover;">
                    <!--<div class="carb-body text-center mt-3" style="height: 10rem;">
                        <img src="imagenes/mascotas/${cuerpoApoyo._foto}" class="card-img-top" alt="logo del cuerpo apoyo" style="max-height: 100%; width: auto;"/>
                    </div>-->
                    <div class="card-body text-center" style="aling-items: center;">
                        <h4 class="card-title">${cuerpoApoyo._nombre}</h4>
                        <h5 class="card-text">${cuerpoApoyo.especialidad}</h5>
                        <h5 class="card-text">${cuerpoApoyo._cargo}</h5>
                        <h5 class="card-text">${cuerpoApoyo._equipo}</h5>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cuerpo${cuerpoApoyo._id}">VER MAS</button>
                        <button type="button" class="btn btn-primary eliminarCuerpoA" id="${cuerpoApoyo._id}">ELIMINAR</button>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade text-center" id="cuerpo${cuerpoApoyo._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h2 class="modal-title" id="staticBackdropLabel">MAS SOBRE EL CUERPO DE APOYO</h2>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="container text-center">
                                        <div class="row">
                                            <div class="col-5">
                                                Id cuerpo Apoyo:
                                            </div>
                                            <div class="col-6">
                                                ${cuerpoApoyo._id}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                Id Equipo:
                                            </div>
                                            <div class="col-6">
                                                ${cuerpoApoyo._idEquipo}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                Fecha de ingreso:
                                            </div>
                                            <div class="col-6">
                                                ${cuerpoApoyo._fecha}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                Email:
                                            </div>
                                            <div class="col-6">
                                                ${cuerpoApoyo._email}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                Años de Experiencia:
                                            </div>
                                            <div class="col-6">
                                                ${cuerpoApoyo._year}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                Tipo de Apoyo:
                                            </div>
                                            <div class="col-6">
                                                ${cuerpoApoyo._tipoApoyo}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                Equipo al que pertenece:
                                            </div>
                                            <div class="col-6">
                                                ${cuerpoApoyo._equipo}
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
        return cuerpoApoyoHTML;
    } 

    //funcion para limpiar el formulario del cuerpo de apoyo
    limpiarDatoJugadores = () => {
        document.querySelector('#limpiarDatosCuerpoA').addEventListener('click', (e) => {
            const frmDatosApoyo = document.querySelector('#datosCuerpoApoyo');
            for (let frmItem of frmDatosApoyo) {
                switch (frmItem.id) {
                    case 'txtNombreDelEquipo':
                        frmItem.value = 'Seleccione el equipo';
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

    //funcion para eliminar un cuerpo de apoyo de la lista cuerpo de apoyo 
    eliminarjugadorLista = () => {
        document.querySelectorAll(".eliminarCuerpoA").forEach((val, indi) => {
            val.addEventListener('click', (e) => {
                let targeta = document.querySelectorAll('#ocultarTargeta');
                console.log(e.target.id);
                cuerpoApoyos = JSON.parse(localStorage.getItem("cuerpoApoyos"));

                cuerpoApoyos.forEach((divData, posi) => {
                    if (divData._id === e.target.id) {
                        console.log(divData);
                        cuerpoApoyos.splice(posi, 1);//eliminar un elemento del  elemento del array objeto equipo
                        targeta[indi].style.display = "none";
                        localStorage.setItem("cuerpoApoyos", JSON.stringify(cuerpoApoyos));
                        console.log(cuerpoApoyos);
                    }
                });

                this.cargarLIstaCuerpoApoyo();
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        });    
    }
}
customElements.define('frm-cuerpo-apoyo-nba', FrmCuerpoApoyo);