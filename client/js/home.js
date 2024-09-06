import { showNewAddress } from "./api_front/cards.js";
import { createClientData, createAddressOfClient } from "./api_front/create.js";
import { getAddressByCEP } from "./api_front/viaCEP.js";

export class Home {
    constructor() {
        this.addressCount = 0; // Contador para o número de endereços
    }
    

    // Gera o HTML para o formulário de cadastro do cliente
    carregar() {
        const html = `
            <div class='dark-gray-container' id='c-cadastro'>
                <h1> CLIENTE - CADASTRO </h1>

                <form id='form-cad' method="POST">

                    <!-- Campo para o nome do cliente -->
                    <span id='name_span'> <label for='nome'> Nome: </label> </span>
                    <input type='text' id='nome_input' name='nome' required placeholder='Maria Silva'>
                    <br>

                    <!-- Campos para idade e sexo do cliente -->
                    <span id='age-sex'>
                        <span id='age_span'> <label for='idade'> Idade: </label> </span> <br>
                        <input type='text' id='idade_input' name='idade' required placeholder='18' maxlength='3'>
                        <span id='sex-span'> <label for='sexo'> Sexo: </label> </span>
                        <select id='sexo_select' name='sexo' required>
                            <option value='Masculino' selected> Masculino </option>
                            <option value='Feminino'> Feminino </option>
                            <option value='Outro'> Outro </option>
                        </select>
                    </span>
                    <br>

                    <!-- Botão para adicionar endereços -->
                    <button type='button' id='btn-adress'> ADICIONAR ENDEREÇO </button>
                    
                    <!-- Contêiner para endereços -->
                    <div id="enderecos">
                    </div>

                    <!-- Botão para salvar todo o formulário -->
                    <button type='button' class='btn-submit' id="btn-submit"> SALVAR TUDO </button>
                
                </form>
            </div>
        `;
        return html;
    }

    // Inicializa eventos para interação com o formulário
    inicializarEventos() 
    {
        showNewAddress()
        
        const btn_submit = document.getElementById("btn-submit");
        btn_submit.addEventListener('click', async () => 
        {
            await createClientData()
            createAddressOfClient()
            window.location.hash = "#visualizar"; 
        })

    }
}
