import { FrmEquipos } from "../component/frmequipos.js";
import { NavBarMenu } from "../component/navbarmenu.js";
import { FrmCuerpoApoyo } from "../component/frmcuerpoapoyo.js";
import { FrmJugadores } from "../component/frmjugadores.js";

//comvertir de UTC a GMT
function convertirUtcAgmt(fechaUtc) {
    //convertir la fecha UTC a objeto Date
    let fecha = new Date(fechaUtc);

    //obtiene la hora en milisegundos
    let horaUtc = fecha.getTime();

    //obtener la zona horaria actual de la fecha UTC en minutos
    let zonaHoraria = fecha.getTimezoneOffset();

    //convuerte la zona horario de minutos a milisegundos
    let zonaHorariaMs = zonaHoraria * 60 * 1000;

    //resta la zona horaria a la hora UTC para obtener la hora GMT
    let horaGmt = horaUtc;

    //crea un nueva fecha a partir de la hora GMT y establece la zona horaria a UTC+0
    let fechaGmt = new Date(horaGmt);
    fechaGmt.setTime(fechaGmt.getTime() + (fechaGmt.getTimezoneOffset() * 60 * 1000));
    let fechaFull = new Date(fechaGmt.toISOString());
    return fechaFull;
}
//tener un boton con un addeventlisener para poder llamarlas
//obtener la hora a partir del codId
function getHoraCreacion(codId) {
    //pasar de hexadecimal a decimal
    let fechaUtc = parseInt(codId.toString(16),16);
    let fecha = convertirUtcAgmt(fechaUtc);
    return fecha.toLocaleTimeString('es-CO');
}
//obtener la fecha a partir del codId
function getFechaCreacion(codId) {
    let fechaUtc = parseInt(codId.toString(16),16);
    let fecha = convertirUtcAgmt(fechaUtc);
    return fecha.toLocaleDateString('es-CO');
}
//obtener la fecha y hora a partir del codId
function getFechaHoraCreacion(codId) {
    let fechaUtc = parseInt(codId.toString(16),16);
    let fecha = convertirUtcAgmt(fechaUtc);
    return `${fechaFull.toLocaleDateString('es-CO')} ${fechaFull.toLocaleTimeString('es-CO')}`;
}

/*function rangeSlider(value) {
    //document.querySelector('#rangeValue').innerHTML = value;
    if (value < 35) {
        document.querySelector('#rangeValue').innerHTML = "BASICO";
    } else if ((value >= 35) && (value < 71)) {
        document.querySelector('#rangeValue').innerHTML = "INTERMEDIO";
    } else {
        document.querySelector('#rangeValue').innerHTML = "AVANZADO";
    }
}*/

//let experiencia = document.querySelector('#txtNivelExperiencia');
//experiencia.addEventListener("change", rangeSlider(experiencia.value));
//experiencia.addEventListener("mousemove", rangeSlider(experiencia.value));
//console.log(experiencia.value);

//Select del equipo me sirve para hacer el de los paises
/*document.querySelector('#txtDivision').addEventListener('change', (e) => {
    clearSelect('#txtNombreEquipo');
    const selectChild = document.querySelector('#txtNombreEquipo');
    const itemStar = document.createElement('option');
    itemStar.innerHTML = 'Selecione un nombre de equipo';
    itemStar.selected;
    selectChild.appendChild(itemStar);

    let confselect = Conferencia.filter(confItem => confItem.id == txtZona.value);
    console.log(txtZona.value);
    confselect.forEach(element => {
        let dataItem = JSON.parse(JSON.stringify(element));
        let equi = dataItem.divisiones.filter(equi => equi.idDiv == e.target.value);
        console.log(e.target.value);
        equi.forEach(elemeto => {
            let dataItemE = JSON.parse(JSON.stringify(elemeto));
            console.log(equi);
            console.log(dataItemE);
            dataItemE.equipos.forEach(divEqui => {
                const itemEqui = document.createElement('option');
                itemEqui.value = divEqui.idEqui;
                itemEqui.innerHTML = divEqui.equipo;
                selectChild.appendChild(itemEqui);
                //console.log(divEqui)
            })
        })
        
    })
    e.stopImmediatePropagation();
    e.preventDefault();
});*/