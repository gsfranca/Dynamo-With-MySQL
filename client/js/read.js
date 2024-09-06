import { readNames } from "./api_front/readClientNames.js";
import { catchZipCodeId } from "./api_front/create.js";
import { updateClientData, updateAddressOfClient } from "./api_front/update.js";
export class Read {
    constructor() 
    {
        // Constructor is empty, but you can initialize properties if needed
    }

    carregar() 
    {
        const html = `
        <div class='list-model-display'>
            <div id="div_main">
                <!-- Content for div_main -->
            </div>
            
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

    inicializarEventos()
    {
        window.addEventListener("load", async () => 
        {
            readNames()
                // Função para verificar e adicionar o event listener em cada botão de endereço
                    const verificarEAdicionarEvento = () => 
                    {
                        const addressForms = document.getElementsByClassName("address-form");
                        const COUNT_ADDRESSES = addressForms.length;
                        
                        for (let i = 1; i <= COUNT_ADDRESSES; i++) 
                        {
                            const btn_submit_address = document.getElementById(`btn-submit-address-${i}`);
                            
                            if (btn_submit_address) 
                            {
                                btn_submit_address.addEventListener("click", async () => 
                                {
                                    const id_client = document.getElementById("id_client_input").value;
                                    const id_address_of_client = document.getElementById(`id_address_of_client_input-${i}`).value;
                                    const complement_address_of_client = document.getElementById(`complemento_select-${i}`).value;
                                    const number_address_of_client = document.getElementById(`numero_select-${i}`).value;
                                    const cep_value = document.getElementById(`cep_input-${i}`).value;
                                    
                                    if (!id_address_of_client 
                                        || !complement_address_of_client 
                                        || !number_address_of_client 
                                        || !cep_value
                                    ) 
                                    {
                                        console.error(`Por favor, preencha todos os campos de endereço ${i}.`);
                                    }
                                    
                                    const id_address = await catchZipCodeId(cep_value);
                                    await updateAddressOfClient(id_address_of_client, complement_address_of_client, id_address, id_client, number_address_of_client);
                                });
                            }
                        }
                        
                        if (!document.querySelector("button[id^='btn-submit-address']"))
                        {
                            console.log("Nenhum botão de endereço encontrado. Aguardando...");
                        } 
                        else 
                        {
                            clearInterval(intervalId); // Limpa o intervalo após encontrar os botões
                        }
                    };

                    // Definir o intervalo de verificação
                    const intervalId = setInterval(verificarEAdicionarEvento, 1000);
                            }
                        )}}
