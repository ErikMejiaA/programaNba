export { NavBarMenu };
class NavBarMenu extends HTMLElement {
    constructor() {
        super();
        this.barraMenu();
        this.barraMenuOpciones();
    }
    barraMenu() {
        this.innerHTML = /* html */ `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img src="imagenes/logoNBA.jpg" alt="Logo NBA" width="150px"/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link mainMenu" current="page" href="#" data-verocultar='["#grupoEquipos", ["#grupoJugadores", "#grupoApoyo"]]'>Equipos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mainMenu" href="#" data-verocultar='["#grupoJugadores", ["#grupoEquipos", "#grupoApoyo"]]'>Jugadores</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mainMenu" href="#" data-verocultar='["#grupoApoyo", ["#grupoJugadores", "#grupoEquipos"]]'>Cuerpo de Apoyo</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `
    }
    //menu de la pagina
    //ocultar y ver las tragetas de las clases
    barraMenuOpciones = () => {
        document.querySelectorAll(".mainMenu").forEach((val, id) => {
            val.addEventListener("click", (e) => {
                let data = JSON.parse(e.target.dataset.verocultar);
                //console.log(data);
                let cardver = document.querySelector(data[0]);
                cardver.style.display = "block";
                data[1].forEach(card => {
                    let cardActual = document.querySelector(card);
                    cardActual.style.display = "none";
                });
                document.querySelector('#equi').style.display = "none";
                document.querySelector('#cuer').style.display = "none";
                document.querySelector('#juga').style.display = "none";
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        })
    }
}
customElements.define('nav-bar-menu', NavBarMenu);