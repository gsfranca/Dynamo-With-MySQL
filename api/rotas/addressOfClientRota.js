import express from 'express';
import AddressOfClientController from '../controllers/addressOfClientController.js';

class AddressOfClientRota
{
    constructor(database) 
    {
        this.router = express.Router();
        this.controller = new AddressOfClientController(database);
        this.setupRoutes();
    }

    setupRoutes() 
    {
        this.router.post('/address_of_client/create', (req, res) => {this.controller.storeAddressOfClient(req, res)});
        this.router.get('/address_of_client/read/:id_address_of_client', (req, res) => this.controller.getAddressOfClient(req, res));
        this.router.put('/address_of_client/update/:id_address_of_client', (req, res) => this.controller.setAddressOfClient(req, res));
        this.router.delete('/address_of_client/delete/:id_address_of_client', (req, res) => this.controller.destroyAddressOfClient(req, res));
    }
}

export default AddressOfClientRota;
