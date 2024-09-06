import { deleteClient } from "./deleteClient.js";
import { readClientByID } from "./readClientByID.js";

function selectName() 
{
    // Catching the elements from the body (HTML Collection)
        const client_names = document.getElementsByClassName("client_name");

    // Converting HTML Collection to Array
        const client_names_array = Array.prototype.slice.call(client_names);

    // Create an event listener for each header
        client_names_array.forEach((header) => 
        {
            header.addEventListener('click', () => 
            {
                // Clean the older selected
                    client_names_array.forEach(selected => selected.classList.remove("selected-p"));

                // Select a new one
                    header.classList.add("selected-p");

                // Get the ID from the data-id attribute
                    const id = header.getAttribute('data-id');
                
                // Call the function with the selected ID
                    readClientByID(id);
            });
    });
}
function mapClientNames(RESULT_CLIENT_NAMES)
{
    // Array to save the foreach results
        let client_names = []

    // Foreach to treat the API results (Array of Objects)
        RESULT_CLIENT_NAMES.forEach(client_name => 
        {
            client_names.push({
                    id_client: client_name.id_client,
                    name_client: client_name.name_client,       
            })
        });

    // Return the Array now filled
        return client_names
}
function showClientNames(data)
{
    // Take the HTML var to increase and clean it
        const dark_gray_list = document.getElementById("dark-gray-list");
        dark_gray_list.innerHTML = '';

    // Add names to screen
        let i = 1
        data.forEach(name => 
        {
            dark_gray_list.innerHTML += `
            <p class="client_name" id="client_name_${i}" data-id="${name.id_client}"> ${name.name_client} </p>
            <span class='trash-icon' id="delete_${name.id_client}" data-id='${name.id_client}'> 
                <img src='../assets/Delete-Icon.png'> 
            </span> 
            `;
            i++;
            selectName()
        })
        
}

export async function readNames()
{
    try
    {
        axios.get('http://localhost:3000/client/readNames')
        .then(client_names_response => 
        {
            
            const RESULT_CLIENT_NAMES = client_names_response.data.result
                showClientNames(mapClientNames(RESULT_CLIENT_NAMES))
                deleteClient()
        })
    }
    catch (error) {console.error(error);}
}
