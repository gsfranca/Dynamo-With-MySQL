import { NavBar } from './navbar.js'
import { Router } from './router.js'

class App {
    constructor() {
        // Inicializa a NavBar e o Router
        this.nav = new NavBar()
        this.router = new Router()
        this.iniciar()
    }

    iniciar() {
        // Carrega os arquivos CSS
        this.carregarCSS('style.css');
        this.carregarCSS('create&edit.css');
        this.carregarCSS('read.css')

        // Carrega a NavBar
        this.nav.carregar();

        // Configura os links da navbar para navegação
        document.getElementById('home-link').addEventListener('click', () => {
            window.location.hash = '#home'
            this.router.navegar()
        })

        document.getElementById('view-link').addEventListener('click', () => {
            window.location.hash = '#visualizar'
            this.router.navegar()
        })

        // Navega para a rota inicial
        this.router.navegar()
    }

    carregarCSS(nomeDoArquivo) {
        // Cria e adiciona um link de CSS ao head do documento
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `styles/${nomeDoArquivo}`;
        document.head.appendChild(link);
    }
}

// Cria uma instância da aplicação
const app = new App()
