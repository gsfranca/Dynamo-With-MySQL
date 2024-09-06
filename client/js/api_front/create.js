async function createClientData() 
{
    try 
    {
        const client_name_value = document.getElementById("nome_input").value;
        const client_age_value = document.getElementById("idade_input").value;
        const client_gender_value = document.getElementById("sexo_select").value;


        const response = await axios.post(`http://localhost:3000/client/create`, {
            name_client: client_name_value,
            age_client: client_age_value,
            gender_client: client_gender_value,
        })
    } 
    catch (error) {console.error('Erro ao criar cliente ou obter lista:', error);}
}

async function catchLastClientID()
{
    try 
    {
        const response = await axios.get('http://localhost:3000/client/readNames');
        const result = response.data.result;
        const id_lastClient = result[0].id_client;
        return id_lastClient;
    } 
    catch (error) {console.error(error);}
}
export async function catchZipCodeId(zip_code)
{
    try 
    {
        const response = await axios.get(`http://localhost:3000/address/read/${zip_code}`);
        const result = response.data.result;
        const id_zip_code = result[0].id_address;
        return id_zip_code;
    } 
    catch (error) {console.error(error);}
}
async function createAddressOfClient() 
{
    try 
    {
        const addressForms = document.getElementsByClassName("address-form");
        const COUNT_ADDRESSES = addressForms.length;
        

        if (COUNT_ADDRESSES > 0) 
        {
            for (let i = 0; i < COUNT_ADDRESSES; i++) 
            {
                const input_numero = document.getElementById(`numero_select-${i + 1}`);
                const input_complemento = document.getElementById(`complemento_select-${i + 1}`);
                const cep_input = document.getElementById(`cep_input-${i + 1}`);

                if (input_numero && input_complemento && cep_input && input_numero.value !== "" && input_complemento.value !== "") 
                {
                    try 
                    {
                        const zipCodeId = await catchZipCodeId(cep_input.value);
                        const clientId = await catchLastClientID()

                        const respond = await axios.post(`http://localhost:3000/address_of_client/create`, {
                            complement_address_of_client: input_complemento.value,
                            id_address: zipCodeId,
                            id_client: clientId,
                            number_address_of_client: input_numero.value,
                        });

                    } 
                    catch (error) {console.error(`Erro ao chamar a API para o endereço ${i + 1}:, error`);}
                } 
                else{console.error(`Inputs inválidos ou vazios para o endereço ${i + 1}: numero_select-${i + 1}: ${input_numero?.value}, complemento_select-${i + 1}: ${input_complemento?.value}`);}
            }
        } 
        else {console.error("Nenhum formulário de endereço identificado.");}
    } 
    catch (error){console.error("Erro na função createAddressOfClient:", error);}
}


export{
    createAddressOfClient, createClientData
}