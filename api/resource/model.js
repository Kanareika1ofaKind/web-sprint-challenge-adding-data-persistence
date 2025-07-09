// build your `Resource` model here

const db = require('../../data/dbConfig.js'); // import the database configuration

async function getAll() {
    const resources = await db('resources'); // fetch all resources from the database

    return resources.map(({resource_name, ...res}) => ({
        ...res, // spread operator to include all properties
        resource_name: resource_name.trim() // trim whitespace from resource_name
    })); // return the array of resources with trimmed names
}

async function getById(res_id) {
    const resource = await db('resources').where({ resource_id: res_id }).first(); // fetch resource by id
    if (!resource) {
        return null; // return null if no resource found
    }
    return {
        ...resource, // spread operator to include all properties
        resource_name: resource.resource_name.trim() // trim whitespace from resource_name
    }; // return the resource with trimmed name
}

async function create(resourceData) {

    const [id] = await db('resources').insert(resourceData); // insert the resource and get the id
    return getById(id); // return the created resource by id
}




module.exports = {
    getAll,
    getById,
    create
};