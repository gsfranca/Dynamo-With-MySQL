import { getAddressByCEP } from "./viaCEP.js";

function card_address(i, zip_code_value, street_value, neighborhood_value, region_value, city_value, state_value, country_value, number_value, complement_value) 
{
    return `
            <div class='address-container'>

                <!-- Cabeçalho do endereço -->
                    <div class='header' >
                        <span>ENDEREÇO ${i}</span>
                        <span class='arrow'>&#9660;</span>
                    </div>

                <!-- Formulário para detalhes do endereço -->
                    <div class='address-form' id='address-form-${i}' style="display: none">

                        <label>CEP:</label>
                        <input type='text' placeholder='00000-000' id="cep_input-${i}" value="${!zip_code_value ? "" : zip_code_value}">

                        <button type="button" class="btn_zipCode" id="btn_zipCode_${i}">Buscar CEP</button>
                        
                        <label>Rua:</label>
                        <input type='text' placeholder='Av. Paulista' id="rua_select-${i}" value="${!street_value ? "" : street_value}" disabled> 


                        <label for="numero">Número:</label><br>
                        <input type='text' id="numero_select-${i}" value="${!number_value ? "" : number_value}">
                        
                        <label for="complemento">Complemento:</label><br>
                        <input type='text' id="complemento_select-${i}" value="${!complement_value ? "" : complement_value}">
                            
                        <label for="bairro">Bairro:</label><br>
                         <input type='text' id="bairro_select-${i}" value="${!neighborhood_value ? "" : neighborhood_value}" disabled>

                         <label for="regiao">Região:</label><br>
                         <input type='text' id="regiao_select-${i}" value="${!region_value ? "" : region_value}" disabled>

      
                         <label for="cidade">Cidade:</label><br>
                         <input type='text' id="cidade_select-${i}" value="${!city_value ? "" : city_value}" disabled>

                        <label for="estado">Estado:</label><br>
                        <input type='text' id="estado_select-${i}" value="${!state_value ? "" : state_value}" disabled>

                        <label for="pais">País:</label><br>
                        <input type='text' id="pais_select-${i}" value="${!country_value ? "" : country_value}" disabled>

                </div>
            </div>` ;
}

function card_nameList(name_value, age_value, gender_value)
{
    return `
    <div class='dark-gray-container' id='c-read'>
        <h1> INFORMAÇÕES DO CLIENTE </h1>

        <form id='form-cad'>

            <!-- Campo para o nome do cliente, preenchido com valor default -->
            <span id='name_span'> <label for='nome'> Nome: </label> </span>
            <input type='text' id='nome_input' name='nome' required placeholder='Maria Silva' value='${name_value}'>

            <br>

            <!-- Campos para idade e sexo do cliente, preenchidos com valores default -->
            <span id='age-sex'>
                <span id='age_span'> <label for='idade'> Idade: </label> </span> <br>
                <input type='text' id='idade_input' name='idade' required placeholder='18' maxlength='3' value='${age_value}'>

                <span id='sex-span'> <label for='sexo'> Sexo: </label> </span>
                <select id='sexo_select' name='sexo' required>
                    <option value='${gender_value}' selected> ${gender_value} </option>
                    <option value='Feminino'> Feminino </option>
                    <option value='Masculino'> Masculino </option>
                    <option value='Outro'> Outro </option>
                </select>
            </span>

            <br>

            <!-- Botão para adicionar endereços -->
            <button type='button' id='btn-adress'> ADICIONAR ENDEREÇO </button>

            <!-- Contêiner para endereços com um formulário padrão preenchido -->
            <div id="enderecos"></div>
    </div>
    `
}

function displayCardAddress() 
{
    // Catching the elements from the body (HTML Collection)
        const addresses_form = document.getElementsByClassName("address-form");
        const addresses_header = document.getElementsByClassName("header");

    // Converting HTML Collection to Array
        const addresses_form_array = Array.prototype.slice.call(addresses_form);
        const addresses_header_array = Array.prototype.slice.call(addresses_header);

    // Create an each event listener to each header
        addresses_header_array.forEach((header, index) => 
        {
            header.addEventListener('click', () => 
            {
                // Use Index var to create a dynamic id
                    const form = addresses_form_array[index];

                    if (form) 
                    {
                        // One line if else to display block or none
                            form.style.display = form.style.display === 'none' ? 'block' : 'none';
                    }
            });
        });
        getAddressByCEP()
}

function showNewAddress()
{
    // HTML elements: Used to map a event or return something to HTML
        const div_enderecos = document.getElementById("enderecos")
        const btn_address = document.getElementById("btn-adress")
        const addresses_in = document.getElementsByClassName("address-container")

    // Counter to new Addresses, that continue the count from API addresses
        let new_addresses_count = addresses_in.length + 1
    
    // Event listener that display the card on HTML and increase the counter
        btn_address.addEventListener('click', () => 
        {
            div_enderecos.innerHTML += card_address(new_addresses_count)
            new_addresses_count++

            // Use displayCardAddress to be able to open the new cards
                displayCardAddress()
        })

        

}

export {
    card_address,
    card_nameList,
    displayCardAddress,
    showNewAddress
}