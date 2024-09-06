import { readNames } from "./api_front/readClientNames.js"

export class NavBar{
    constructor() {
        this.elemento = document.querySelector('nav')
    }

    carregar() {
        this.elemento.innerHTML = `
            <a href='#home' id='home-link'> Cadastro de Clientes </a>

            <span id='nav-links'>
                <a href='#visualizar' id='view-link'> Visualizar </a>
                <a href='#home' id='create-link'> Cadastrar </a>
            </span>
        `
    }

}