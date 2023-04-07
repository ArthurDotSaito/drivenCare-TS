import err from '../errors/index.js';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validadeSchema(schema: ObjectSchema<any>){
    return (req: Request,res: Response,next: NextFunction) =>{
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


