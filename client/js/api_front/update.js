import { readNames } from "./readClientNames.js"

async function createClientData()
{
    try 
    {
        const client_name_value = document.getElementById("nome_input").value 
        const client_age_value = document.getElementById("idade_input").value
        const client_gender_value = document.getElementById("sexo_select").value

        await axios.post(`http://localhost:3000/client/create`, {
            name_client: client_name_value,
            age_client: client_age_value,
            gender_client: client_gender_value
        })
        .then(() => {window.location.hash = '#visualizar'; readNames()})
    } 
    catch (error) {console.error(error);}
}

export async function create() 
{
    const btn_submit = document.getElementById("btn-submit")
    btn_submit.addEventListener('click', () =>
    {
        createClientData()
    })
    
    
}
