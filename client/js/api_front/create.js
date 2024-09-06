import { readNames } from "./readClientNames.js";
import { getAddressByCEP } from "./viaCEP.js";

async function createClientData() {
    try {
        const client_name_value = document.getElementById("nome_input").value;
        const client_age_value = document.getElementById("idade_input").value;
        const client_gender_value = document.getElementById("sexo_select").value;

        console.log("Criando cliente com os seguintes dados:");
        console.log("Nome:", client_name_value);
        console.log("Idade:", client_age_value);
        console.log("Gênero:", client_gender_value);

        const response = await axios.post(`http://localhost:3000/client/create`, {
            name_client: client_name_value,
            age_client: client_age_value,
            gender_client: client_gender_value,
        });

        console.log("Cliente criado com sucesso:", response.data);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
    }
}

async function catchLastClientID() {
    try {
        const response = await axios.get(`http://localhost:3000/client/readNames`);
        const result = response.data;
        const id_client = result[0].id_client;

        console.log("Último ID de cliente obtido:", id_client);

        return id_client;
    } catch (error) {
        console.error('Erro ao obter último ID de cliente:', error);
    }
}

async function catchZipCodeId(zip_code) {
    try {
        const response = await axios.get(`http://localhost:3000/address/read/${zip_code}`);
        const result = response.data;
        const zip_codes = [];

        result.forEach(zip_code => {
            zip_codes.push(zip_code.id_address);
        });

        console.log(`ID(s) de endereço obtido(s) para o CEP ${zip_code}:`, zip_codes);

        return zip_codes;
    } catch (error) {
        console.error(`Erro ao obter ID do CEP ${zip_code}:`, error);
    }
}

async function createAddressOfClient() {
    const COUNT_ADDRESSES = document.getElementsByClassName("address-form").length;
    console.log(`Número de formulários de endereço: ${COUNT_ADDRESSES}`);

    if (COUNT_ADDRESSES > 0) {
        for (let i = 0; i < COUNT_ADDRESSES.length; i++) {
            const input_numero = document.getElementById(`numero_select-${i}`);
            const input_complemento = document.getElementById(`complemento_select-${i}`);

            if (input_numero.value !== "" && input_complemento.value !== "") {
                try {
                    const id_address = await catchZipCodeId(document.getElementById("cep_input").value);
                    const id_client = await catchLastClientID();

                    console.log(`Enviando para API: id_address = ${id_address}, id_client = ${id_client}`);
                    console.log(`Número: ${input_numero.value}, Complemento: ${input_complemento.value}`);

                    const response = await axios.post(`http://localhost:3000/address_of_client/create`, {
                        id_address: id_address,
                        id_client: id_client,
                        complement_address_of_client: input_complemento.value,
                        number_address_of_client: input_numero.value,
                    });

                    console.log("Endereço criado com sucesso:", response.data);
                } catch (error) {
                    console.error("Erro ao criar endereço:", error);
                }
            } else {
                console.error(`Campos número ou complemento estão vazios: ${input_numero.value}, ${input_complemento.value}`);
            }
        }
    } else {
        console.error("Nenhum formulário de endereço identificado.");
    }
}

export async function create() {
    const btn_submit = document.getElementById("btn-submit");

    btn_submit.addEventListener('click', async () => {
        console.log("Iniciando criação de cliente e endereços.");
        await createClientData();
        await createAddressOfClient();
        console.log("Processo de criação concluído.");
    });
}
