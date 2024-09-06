import { readNames } from "./readClientNames.js";

export async function deleteClient(id_client) 
{
    // Get all delete buttons
        const delete_btns = document.getElementsByClassName("trash-icon")
    
    // Convert to Array 
        const delete_btns_array = Array.prototype.slice.call(delete_btns);
    // Create a each event listener to each button
        delete_btns_array.forEach(delete_btn => 
        {
            delete_btn.addEventListener('click', async () =>
            {
                try 
                {
                    await axios.delete(`http://localhost:3000/client/delete/${delete_btn.getAttribute('data-id')}`);
                    readNames();
                } 
                catch (error) {console.error(error);}
            })
        });
}
