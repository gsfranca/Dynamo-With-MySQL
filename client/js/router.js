import { Home } from './home.js';
import { Read } from './read.js';

export class Router {

    constructor() {
        // Mapeia rotas para instâncias de páginas
        this.rotas = {
            '#home': new Home(),
            '#visualizar': new Read(),
        }

        // Configura eventos para navegação
        window.addEventListener('load', this.navegar.bind(this));
        window.addEventListener('hashchange', this.navegar.bind(this));
    }

    navegar() {
        const divConteudo = document.getElementById('conteudo');
        const hash = window.location.hash;

        // Seleciona a página com base no hash ou a página inicial
        const pagina = this.rotas[hash] || this.rotas['#home'];
        divConteudo.innerHTML = ''; // Limpa o conteúdo existente
        divConteudo.innerHTML = pagina.carregar(); // Carrega o novo conteúdo

        // Inicializa eventos da página carregada, se houver
        if (typeof pagina.inicializarEventos === 'function') {
            pagina.inicializarEventos();
        }
    }
}
