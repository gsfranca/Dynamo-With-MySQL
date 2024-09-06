import { readNames } from "./api_front/readClientNames.js";
import { readClientByID } from "./api_front/readClientByID.js";

// On CLick Client ID nao funciona

export class Read 
{
    constructor() 
    {
    }

    // Gera o HTML para exibição das informações do cliente e da lista de clientes
    carregar() {
        const html = `


        <div class='list-model-display'>

            <div id="div_main"></div>
            
            <!-- Seção para exibir a lista de clientes -->
            <div id='dark-gray-list-container'>
                <h1> CLIENTES </h1>

                <span> * Para excluir o cliente atual, selecione outro cliente. </span>
                    
                <div id='dark-gray-list'></div>
                
            </div>

        </div>
        `;

        return html;
    }

    // Inicializa eventos para interação com o formulário e a lista de clientes
    inicializarEventos() 
    {
        
        window.addEventListener("load", async (event) => 
        {
            await readNames()
            readClientByID();
        });


    }
}
