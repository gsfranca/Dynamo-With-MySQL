import express from 'express';
import AddressController from '../controllers/addressController.js';

class AddressRota
{
    constructor(database) 
    {
        this.router = express.Router();
        this.controller = new AddressController(database);
        this.setupRoutes();
    }

    setupRoutes() 
    {
        this.router.post('/address/create', (req, res) => {this.controller.storeAddress(req, res)});
        this.router.get('/address/read', (req, res) => this.controller.getAddresses(req, res));
        this.router.get('/address/read/:id_zipCode', (req, res) => this.controller.getAddressByZipCode(req, res));
        this.router.put('/address/update/:id_address', (req, res) => this.controller.setAddress(req, res));
        this.router.delete('/address/delete/:id_address', (req, res) => this.controller.destroyAddress(req, res));
    }
}

export default AddressRota;
