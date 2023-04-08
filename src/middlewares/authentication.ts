import errors from '../errors/index.js';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import patientRepositories from '../repositories/patientRepositories.js';
import doctorRepositories from '../repositories/doctorRepositories.js';
import { Request, Response, NextFunction } from 'express-serve-static-core';

function authentication(type:string){
    return function(req: Request, res: Response, next: NextFunction){
        const { authorization } = req.headers;
        if(!authorization) throw errors.unauthorizedError();
    
        const parts = authorization.split(" ");
        if(parts.length !== 2) throw errors.unauthorizedError();
    
        const [schema, token] = parts;
        if(schema !== 'Bearer') throw errors.unauthorizedError();
    
        jwt.verify(token, String(process.env.SECRET_JWT), async (error, decoded) =>{
            try{
                if (error) throw errors.unauthorizedError();
                let user;

                if(type === "patient"){
                    const {rows: [foundPatient]} = await patientRepositories.findById(isJwtPayload(decoded) ? decoded.userId : undefined)
                    if(!foundPatient) throw errors.unauthorizedError();
                    user = foundPatient;
                }else if(type === "doctor"){
                    const {rows: [foundDoctor]} = await doctorRepositories.findById( isJwtPayload(decoded) ? decoded.userId : undefined)
                    user = foundDoctor
                }
                res.locals.user = user
                console.log(user)
                next();
            }catch(err){
                next(err)
            }
        })
    }
}

function isJwtPayload(decoded: any): decoded is JwtPayload {
    return typeof decoded === "object" && decoded !== null && "userId" in decoded;
}

export { authentication }
