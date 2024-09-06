async function updateClientData(id_client_value, client_name_value, client_age_value, client_gender_value) 
{
    try 
    {
        const response = await axios.put(`http://localhost:3000/client/update/${id_client_value}`, {
            name_client: client_name_value,
            age_client: client_age_value,
            gender_client: client_gender_value,
        });
        console.log("ATUALIZADO", response.data);
    } 
    catch (error) 
    {
        console.error(error);
    }
}

async function updateAddressOfClient(id_address_of_client, complement_address_of_client,  id_address, id_client, number_address_of_client) 
{
    try 
    {
        const response = await axios.put(`http://localhost:3000/address_of_client/update/${id_address_of_client}`, 
        {
            id_address_of_client: id_address_of_client,
            complement_address_of_client: complement_address_of_client,
            id_address: id_address,
            id_client: id_client,
            number_address_of_client: number_address_of_client
        });
        console.log(response.data);
    } 
    catch (error) {console.error(error);}

}



export {updateClientData, updateAddressOfClient}
