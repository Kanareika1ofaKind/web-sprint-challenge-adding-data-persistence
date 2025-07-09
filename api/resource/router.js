// build your `/api/resources` router here

const express = require('express');
const router = express.Router();



const Resource = require('./model.js'); // import the Resource model
const { checkResourceNameExists } = require('./middleware.js'); // import the middleware to check resource name

router.get('/', async (req, res, next) => {
    try {
        const resources = await Resource.getAll();
        res.status(200).json(resources);
    } catch (error) {
        next({ message: 'Error retrieving resources!', error });
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const resource = await Resource.getById(id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found!' });
        }
        res.status(200).json(resource);
    } catch (error) {
        next({ message: 'Error retrieving resource!', error });
    }
});

router.post('/', checkResourceNameExists, async (req, res, next ) => {
    const { resource_name, resource_description } = req.body; // destructure the request body 
    const resourceData = { resource_name, resource_description }; // create a new resource object    
        try {
            const newResource = await Resource.create(resourceData); // create a new resource
            res.status(201).json(newResource); // respond with the created resource
        } catch (error) {
            next({ message: 'Error creating resource!', error });
        }    
});


module.exports = router;
