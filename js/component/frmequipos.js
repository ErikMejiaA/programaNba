import { Equipo } from "../app/Equipo.js";
import { Conferencia } from "../app/bd/conferencias.js";
let equipos = [];
export { FrmEquipos };
class FrmEquipos extends HTMLElement {
    constructor() {
        super();
        this.formulario();
        this.fillConferenceSelect();
        this.seleccionarDivision();
        this.duardarDatosEquipo();
        this.registroDeEquipos();
        this.listaDeEquipos();
        this.limpiarDatoEquipos();
        
        //localStorage.removeItem("equipos");

        if (localStorage.getItem("equipos") != null){
            equipos = JSON.parse(localStorage.getItem("equipos"));
            //console.log(equipos)
        }
    }
    formulario(){
        this.innerHTML = /* html */ `
        <h1>Gestor de equipos</h1>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" id="registroEquipos" data-verocultar='["#equipos", ["#listarEquipos"]]'>Registrar Equipo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="listaEquipos" data-verocultar='["#listarEquipos", ["#equipos"]]'>Listar Equipos</a>
          </li>
        </ul>
        <div id="equi">
            <div class="container mt-3" id="equipos">
                <div class="card">
                    <div class="card-header">
                        Equipo <span class="badge bg-secondary" id="spanIdEquipo"></span>
                    </div>
                    <div class="container">
                        <form id="datosEquipo">
                            <div class="mb-3">
                                <label for="txtZona" class="form-label">Zona</label>
                                <select class="form-select" aria-label="Default select example" id="txtZona">
                                <option selected>Seleccione una zona</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="txtDivision" class="form-label">Division</label>
                                <select class="form-select" aria-label="Default select example" id="txtDivision">

                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="txtNombreEquipo" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="txtNombreEquipo">
                            </div>
                            <div class="mb-3">
                                <label for="txtCiudadEquipo" class="form-label">Ciudad</label>
                                <input type="text" class="form-control" id="txtCiudadEquipo">
                            </div>
                            <div class="mb-3">
                                <label for="txtFechaEquipo" class="form-label">Fecha</label>
                                <input type="date" class="form-control" id="txtFechaEquipo">
                            </div>
                            <div class="mb-3">
                                <label for="txtEmailEquipo" class="form-label">Email</label>
                                <input type="email" class="form-control" id="txtEmailEquipo">
                            </div>
                            <div class="mb-3">
                                <label for="txtYearsEquipo" class="form-label">Years</label>
                                <input type="date" class="form-control" id="txtYearsEquipo">
                            </div>
                            <div class="mb-3">
                                <label for="txtPresidente" class="form-label">Presidente</label>
                                <input type="text" class="form-control" id="txtPresidente">
                            </div>
                            <div class="mb-3">
                                <label for="txtLogo" class="form-label">Logo</label>
                                <input type="file" class="form-control" id="txtLogo">
                            </div>
                            <div class="mb-3">
                                <label for="txtTitulo" class="form-label">Titulos</label>
                                <input type="number" class="form-control" id="txtTitulo" min="0">
                            </div>
                            <div class="mb-3">
                                <label for="txtImgPet" class="form-label">Imagen Mascota</label>
                                <input type="file" class="form-control" id="txtImgPet">
                            </div>
                            <button type="submit" class="btn btn-primary" id="guardarEquipo">GUARDAR</button>
                            <button type="submit" class="btn btn-primary" id="limpiarDatosEquipo">LIMPIAR DATOS</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="container" id="listarEquipos" style="display:none;">
                <h2 class="text-center">Listado de equipos registrados en el torneo</h2>
                <div class="row" id="listarEquiposs">

                </div>
            </div>
        </div>
        `;
    }

    //Select de la division
    seleccionarDivision = () => {
        document.querySelector('#txtZona').addEventListener('change', (e) => {
            this.clearSelect('#txtDivision');
            const selectChild = document.querySelector('#txtDivision');
            const itemStar = document.createElement('option');
            itemStar.innerHTML = 'Seleccione una division';
            itemStar.selected;
            selectChild.appendChild(itemStar);
            let confselect = Conferencia.filter(confItem => confItem.id == e.target.value);
            confselect.forEach(element => {
                let dataItem = JSON.parse(JSON.stringify(element));
                dataItem.divisiones.forEach(divData => {
                    const itemDiv = document.createElement('option');
                    itemDiv.value = divData.idDiv;
                    itemDiv.innerHTML = divData.nombre;
                    selectChild.appendChild(itemDiv);
                });
            })
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    //remover o eliminar los select
    clearSelect(v_select) {
        const selectData = document.querySelector(v_select);
        const options = selectData.querySelectorAll('option');
        options.forEach(element => {
            selectData.removeChild(element);
        })
    }

    //Select de la zona
    fillConferenceSelect() {
        this.clearSelect('#txtZona');
        const selectData = document.querySelector('#txtZona');
        const itemStar = document.createElement('option');
        itemStar.innerHTML = 'Selecione una zona';
        itemStar.selected;
        selectData.appendChild(itemStar);

        Conferencia.forEach(data => {
            let dataItem = JSON.parse(JSON.stringify(data));
            const item = document.createElement('option');
            item.value = dataItem.id;
            item.innerHTML = dataItem.conferencia;
            selectData.appendChild(item);
        })
    }

    //guardar datos de los equipos
    duardarDatosEquipo = () => {    
        document.querySelector('#guardarEquipo').addEventListener('click', (e) => {
            const frmDatosEquipo = document.querySelector('#datosEquipo');
            const idEquipo = document.querySelector('#spanIdEquipo');
            let txtNombreEquipo = frmDatosEquipo["txtNombreEquipo"];
            let txtFechaEquipo = frmDatosEquipo["txtFechaEquipo"];
            let txtEmailEquipo = frmDatosEquipo["txtEmailEquipo"];
            let txtCiudadEquipo = frmDatosEquipo["txtCiudadEquipo"];
            let txtYearsEquipo = frmDatosEquipo["txtYearsEquipo"];
            let txtPresidente = frmDatosEquipo["txtPresidente"];
            let txtLogo = frmDatosEquipo["txtLogo"];
            let txtTitulo = frmDatosEquipo["txtTitulo"];
            let txtZona = frmDatosEquipo["txtZona"];
            let txtDivision = frmDatosEquipo["txtDivision"];
            let txtImgPet = frmDatosEquipo["txtImgPet"];

            let equipo = new Equipo(this.dateToJulian(new Date()), txtNombreEquipo.value, txtFechaEquipo.value, txtEmailEquipo.value, txtCiudadEquipo.value, txtYearsEquipo.value, txtPresidente.value, txtLogo.files[0].name, txtTitulo.value, txtZona.options[txtZona.selectedIndex].text, txtDivision.options[txtDivision.selectedIndex].text, txtImgPet.files[0].name);
            equipos.push(equipo);
            //hacemos guardado de datos en el local storage
            localStorage.setItem("equipos", JSON.stringify(equipos));
            //console.log(equipos);
           
            idEquipo.innerHTML = equipo.id;
            e.stopImmediatePropagation();
            e.preventDefault();
            alert("EL EQUIPO SE GUARDO EXITOSAMENE");
        });
    } 
    // abrir la pestaña de registro de equipos
    registroDeEquipos = () => {
        document.querySelector('#registroEquipos').addEventListener('click', (e) => {
            document.querySelector('#equi').style.display = "block";
            let data = JSON.parse(e.target.dataset.verocultar);
            let verRegitro = document.querySelector(data[0]);
            verRegitro.style.display = "block";
            data[1].forEach(card => {
                let ocultarLista = document.querySelector(card);
                ocultarLista.style.display = "none";
            }); 
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }
    // abrir la pestaña para ver los equipos registrados 
    listaDeEquipos = () => {
        document.querySelector('#listaEquipos').addEventListener('click', (e) => {
            document.querySelector('#equi').style.display = "block";
            let data = JSON.parse(e.target.dataset.verocultar);
            let verLista = document.querySelector(data[0]);
            verLista.style.display = "block";
            data[1].forEach(card => {
                let ocultarRegistro = document.querySelector(card);
                ocultarRegistro.style.display = "none";
            }); 
            //limpiar el formulario del equipo----------------------------
            const frmDatosEquipo = document.querySelector('#datosEquipo');
            for (let frmItem of frmDatosEquipo) {
                switch (frmItem.id) {
                    case 'txtZona':
                        frmItem.value = 'Selecione una zona';
                        break;
                    case 'txtDivision':
                        this.clearSelect('#txtDivision');
                        break;
                    default:
                        frmItem.value = '';
                        break;
                }
            }
            //------------------------------------------------------------            
            this.cargarListaEquipos();
            this.eliminarEquipoLista();
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }
    //funcion para leer los datos que estan guardados en el array de equipos
    cargarListaEquipos = () => {
        let equiposHTML = '';
        for ( let equipo of equipos) {
            equiposHTML += this.crearListaEquipos(equipo);
        }
        document.querySelector('#listarEquiposs').innerHTML = equiposHTML;
        //console.log(equiposHTML);
    }
    //crear la targeta para cada uno de los equipos a mostrar
    crearListaEquipos = (equipo) => {
        let equiposHTML = /* html */ `
                <div class="col-auto" id="ocultarTargeta">
                    <div class="card" style="width: 20rem;" class="object-fit: cover;">
                        <div class="carb-body text-center mt-3" style="height: 10rem;">
                            <img src="imagenes/logos/${equipo._logo}" class="card-img-top" alt="logo del Equipo" style="max-height: 100%; width: auto;"/>
                        </div>
                        <div class="card-body text-center" style="aling-items: center;">
                            <h4 class="card-title">${equipo._nombre}</h4>
                            <h5 class="card-text">${equipo._ciudad}</h5>

                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#equipo${equipo._id}">VER MAS</button>
                            <button type="button" class="btn btn-primary eliminarEquipo" id="${equipo._id}">ELIMINAR</button>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade text-center" id="equipo${equipo._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2 class="modal-title" id="staticBackdropLabel">MAS SOBRE EL EQUIPO</h2>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container text-center">
                                            <div class="row">
                                                <div class="col-4">
                                                    Id Equipo:
                                                </div>
                                                <div class="col-6">
                                                    ${equipo._id}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    Fecha:
                                                </div>
                                                <div class="col-6">
                                                    ${equipo._fecha}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    Email:
                                                </div>
                                                <div class="col-6">
                                                    ${equipo._email}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    Presidente:
                                                </div>
                                                <div class="col-6">
                                                    ${equipo._presidente}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    Titulos:
                                                </div>
                                                <div class="col-6">
                                                    ${equipo._titulos}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    Zona:
                                                </div>
                                                <div class="col-6">
                                                    ${equipo._zona}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    Division:
                                                </div>
                                                <div class="col-6">
                                                    ${equipo._division}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-4">
                                                    Mascota:
                                                </div>
                                                <div class="col-6">
                                                    <img src="imagenes/mascotas/${equipo._imgPet}" alt="mascota del Equipo" style="max-height: auto; width: 50%;"/>
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
        return equiposHTML;
    }
    //Fecha julian para el del ID
    dateToJulian = (date) => {
        // UTC tiempo en milisegundos 
        let utcMilisegundos = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        //pasando a hexadecimal
        return utcMilisegundos.toString(16);
    }
    //funcion para limpiar el formulario de jugadores
    limpiarDatoEquipos = () => {
        document.querySelector('#limpiarDatosEquipo').addEventListener('click', (e) => {
            const frmDatosEquipo = document.querySelector('#datosEquipo');
            for (let frmItem of frmDatosEquipo) {
                switch (frmItem.id) {
                    case 'txtZona':
                        frmItem.value = 'Selecione una zona';
                        break;
                    case 'txtDivision':
                        this.clearSelect('#txtDivision');
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
    //funcion para eliminar un equipo de la lista de equipos 
    eliminarEquipoLista = () => {
        document.querySelectorAll(".eliminarEquipo").forEach((val, indi) => {
            val.addEventListener('click', (e) => {
                let targeta = document.querySelectorAll('#ocultarTargeta');
                console.log(e.target.id);
                equipos = JSON.parse(localStorage.getItem("equipos"));

                equipos.forEach((divData, posi) => {
                    if (divData._id === e.target.id) {
                        console.log(divData);
                        equipos.splice(posi, 1);//eliminar un elemento del  elemento del array objeto equipo
                        targeta[indi].style.display = "none";
                        localStorage.setItem("equipos", JSON.stringify(equipos));
                        console.log(equipos);
                    }
                });

                this.cargarListaEquipos();
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        });    
    }
}
customElements.define('frm-equipos-nba', FrmEquipos);