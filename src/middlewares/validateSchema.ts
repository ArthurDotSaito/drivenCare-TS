import err from '../errors/index.js'

export function validadeSchema(schema){
    return (req,res,next) =>{
        console.log("tentei validar o schema");
        const { error } = schema.validate(req.body, { abortEarly: false });
        if(error){
            console.log("deu ruim schema")
            const errors = error.details.map((detail) => detail.message);
            throw err.unprocessableEntity(errors);
        }
        next();
    }
}

