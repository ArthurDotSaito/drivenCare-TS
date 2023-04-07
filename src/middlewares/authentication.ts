import errors from '../errors/index.js';
import jwt from 'jsonwebtoken';
import patientRepositories from '../repositories/patientRepositories.js';
import doctorRepositories from '../repositories/doctorRepositories.js';

function authentication(type){
    return function(req, res, next){
        const { authorization } = req.headers;
        if(!authorization) throw errors.unauthorizedError();
    
        const parts = authorization.split(" ");
        if(parts.length !== 2) throw errors.unauthorizedError();
    
        const [schema, token] = parts;
        if(schema !== 'Bearer') throw errors.unauthorizedError();
    
        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) =>{
            try{
                if (error) throw errors.unauthorizedError();
                let user;

                if(type === "patient"){
                    const {rows: [foundPatient]} = await patientRepositories.findById(decoded.userId)
                    if(!foundPatient) throw errors.unauthorizedError();
                    user = foundPatient;
                }else if(type === "doctor"){
                    const {rows: [foundDoctor]} = await doctorRepositories.findById(decoded.userId)
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

export { authentication }
