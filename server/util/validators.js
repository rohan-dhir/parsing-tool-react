module.exports.validateProductInput = (
    brand,
    title,
    model
) => {
    const errors = {};
    if(brand.trim() === ''){
        errors.brand = 'Brand name must not be empty';
    }
    if(title.trim() === ''){
        errors.title = 'Title must not be empty';
    }
    if(model.trim() === ''){
        errors.model = 'Model must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}