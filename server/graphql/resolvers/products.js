//Process the query or mutation
const Product = require('../../models/Product');
const { UserInputError } = require('apollo-server');
const { validateProductInput } = require('../../util/validators');

module.exports = {
    Query: {
        async getProducts() {
            try{
                const products = await Product.find();
                return products;
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async addProduct(_,
            { 
                addProductInput : { brand, title, model }
                },
            ){
                const { valid, errors } = validateProductInput(brand, title, model);
                if(!valid) {
                    throw new UserInputError('Errors', { errors });
                }

                //Make sure product does not already exist
                const product = await Product.findOne({ brand, title, model });
                if(product) {
                    throw new UserInputError('Product already exists', {
                        errors: {
                            brand: 'This product already exists'
                        }
                    });
                }
                
                const newProduct = new Product({
                    brand,
                    title,
                    model,
                    dateAdded: new Date().toISOString()
                });

                const res = await newProduct.save();

                return {
                    ...res._doc,
                    id: res._id
                };
        }
    }
};