async function getAddressByCEP() {
    const btns_zipCode = document.getElementsByClassName("btn_zipCode");
    const btns_zipCode_array = Array.from(btns_zipCode);

    btns_zipCode_array.forEach(btn_zipCode => {
        btn_zipCode.addEventListener('click', async () => {
            // Obter o índice do botão clicado
            const index = btn_zipCode.id.split('_').pop();

            // Obter o valor do CEP
            const cep_input = document.getElementById(`cep_input-${index}`);

            if (cep_input) {
                try {
                    // Função para fazer a solicitação
                    const fetchAddress = async () => {
                        try {
                            const response = await axios.get(`http://localhost:3000/address/read/${cep_input.value}`);
                            return response.data.result;
                        } catch (error) {
                            console.error('Erro ao buscar o endereço:', error);
                            return [];
                        }
                    };

                    let result = await fetchAddress();

                    // Se o resultado estiver vazio, aguarde um momento e tente novamente
                    if (result.length === 0) {
                        // Esperar 1 segundo (ou ajuste o tempo conforme necessário)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        result = await fetchAddress();
                    }

                    if (result.length > 0) {
                        const address = result[0]; // Supondo que result é um array e você está interessado no primeiro item

                        // Atualizar os campos com as informações do endereço
                        document.getElementById(`cep_input-${index}`).value = address.zip_code_address || '';
                        document.getElementById(`rua_select-${index}`).value = address.street_address || '';
                        document.getElementById(`bairro_select-${index}`).value = address.neighborhood_address || '';
                        document.getElementById(`regiao_select-${index}`).value = address.region_address || '';
                        document.getElementById(`cidade_select-${index}`).value = address.city_address || '';
                        document.getElementById(`estado_select-${index}`).value = address.state_address || '';
                        document.getElementById(`pais_select-${index}`).value = address.country_address || '';
                    } 
                } 
                catch (error) 
                {
                    console.error('Erro ao buscar o endereço:', error);
                }
            } else {
                console.log(`Elemento com ID cep_input_${index} não encontrado.`);
            }
        });
    });
}

export { getAddressByCEP };
