import { card_address, card_nameList, displayCardAddress, showNewAddress } from "./cards.js";

function mapAddressOfClient(RESULT_ADDRESS_OF_CLIENT, ID_CLIENT)
{
    // Array to save the foreach results
        let addresses_of_client = []

    // Foreach to treat the API results (Array of Objects)
        RESULT_ADDRESS_OF_CLIENT.forEach(address_of_client => 
        {
            if(address_of_client.id_client == ID_CLIENT)
            {
                addresses_of_client.push({
                    id_address_of_client: address_of_client.id_address_of_client,
                    id_client: address_of_client.id_client,
                    id_address: address_of_client.id_address,
                    number_address_of_client: address_of_client.number_address_of_client,
                    complement_address_of_client: address_of_client.complement_address_of_client,         
            })}
        });

    // Return the Array now filled
        return addresses_of_client
}

function mapAddress(RESULT_ADDRESS, AddressOfClient)
{
    // Arrays to save the foreach results
        let addresses = []
        let id_addresses = []

    // Normal vars
        let i = 0

    // Foreach to catch the addresses id (id_address)
        AddressOfClient.forEach( id_address => {id_addresses.push(id_address.id_address)})

    // Foreach to treat the API results (Array of Objects)
        RESULT_ADDRESS.forEach(address=>
        {
            // If the client used the id selected
                if(id_addresses[i] == address.id_address)
                {
                    // It will push to the array var
                        addresses.push({
                            id_address: address.id_address,
                            zip_code_address: address.zip_code_address,
                            street_address: address.street_address,
                            neighborhood_address: address.neighborhood_address,
                            region_address: address.region_address,
                            city_address: address.city_address,
                            state_address: address.state_address,
                            country_address: address.country_address
                            
                        })
                }
            // Else, it will be just ignored and will not be saved
        });

    // Return the Array now filled
        return addresses
}

function showClientAddresses(data_address, data_address_of_client, id_client)
{
    const div_enderecos = document.getElementById("enderecos")
    let cards_count = 1

    // Recive the treated Data
        const Addresses_Of_Client = mapAddressOfClient(data_address_of_client, id_client)
        const Addresses = mapAddress(data_address, Addresses_Of_Client)

    // Show in HTML

        // To show in HTML, firstly, we need to access each data per time
        // Cause we using 2 tables, we need to foreach two times
            Addresses_Of_Client.forEach(address_of_client =>
            {
                Addresses.forEach(address =>
                    {
                        // Elements named address_of_client come from address_of_client
                        // Elements named address come from address table
                        // cards_count is used to count the cards
                        div_enderecos.innerHTML += card_address(
                            cards_count,
                            address_of_client.id_address_of_client,
                            address.zip_code_address, 
                            address.street_address,
                            address.neighborhood_address,
                            address.region_address,
                            address.city_address, 
                            address.state_address, 
                            address.country_address,
                            address_of_client.number_address_of_client, 
                            address_of_client.complement_address_of_client
                        )
                        cards_count++
                        // Use displayCardAddress to be able to open the new cards
                            displayCardAddress()
                    }
                )

            })
    
}

function showClientData(data)
{
    const div_main = document.getElementById("div_main")
    
    data.forEach(client => 
    {
        div_main.innerHTML = card_nameList(client.id_client, client.name_client, client.age_client, client.gender_client)
    });
}


export async function readClientByID(id_client)
{
    
    let j = 0
    try
    {
        axios.all([
            axios.get(`http://localhost:3000/client/read/${id_client}`),
            axios.get(`http://localhost:3000/address_of_client/read`),
            axios.get(`http://localhost:3000/address/read/`)
          ])
          .then(axios.spread((client_response, address_of_client_response, address_response) => 
            {
                // Sever Response
                    let RESULT_CLIENT = client_response.data.result;
                    let RESULT_ADDRESS_OF_CLIENT = address_of_client_response.data.result;
                    let RESULT_ADDRESS = address_response.data.result;

                // Functions
                    if (RESULT_CLIENT && RESULT_ADDRESS_OF_CLIENT && RESULT_ADDRESS) 
                    {
                        showClientData(RESULT_CLIENT)
                        showClientAddresses(RESULT_ADDRESS, RESULT_ADDRESS_OF_CLIENT, id_client)
                        showNewAddress()
                    }

                        

            }))
    }
    catch (error) {console.error(error);}
}


