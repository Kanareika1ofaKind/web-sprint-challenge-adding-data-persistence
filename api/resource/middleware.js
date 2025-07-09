const db = require('../../data/dbConfig.js');

const checkResourceNameExists = async (req, res, next) => {

    const { resource_name } = req.body; // destructure resource_name from request body
    if (!resource_name) { // check if resource_name is provided
        next({ status: 400, message: 'Resource name is required!' }); // if not, call next with an error
    }
    try {
        const existingResource = await db('resources').where({ resource_name }).first(); // check if resource already exists
        if (existingResource) { // if resource exists, return error
            next({ status: 400, message: 'Resource already exists!' });
        }
        next(); // proceed to the next middleware or route handler
    } catch (error) {
        next({ status: 500, message: 'Error checking resource name!', error }); // handle any errors
    }
}

module.exports = {
    checkResourceNameExists
};