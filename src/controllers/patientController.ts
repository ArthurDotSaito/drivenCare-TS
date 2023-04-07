import patientServices from '../services/patientServices.js';
import { Request, Response, NextFunction } from 'express';

async function createPatient(req: Request, res: Response, next: NextFunction){
    const {name, email, password} = req.body
    try{
        await patientServices.createPatient({name, email, password});
        return res.sendStatus(201);
    }catch(error){
        next(error);
    }
}

async function signIn(req: Request, res: Response, next: NextFunction){
    const {email, password} = req.body;
    try{
        const token = await patientServices.signIn({email, password});
        return res.send({token});
    }catch(error){
        next(error)
    }
}

async function doctorsByName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;
    try {
        const { rows: doctors } = await patientServices.doctorsByName({ name });
        return res.send({ doctors });
    } catch (err) {
        next(err);
    }
}

async function doctorsByLocation(req: Request, res: Response, next: NextFunction) {
    const { city }  = req.params;
    try {
        const { rows: doctors } = await patientServices.doctorsByLocation({ city });
        return res.send({ doctors });
    } catch (err) {
        next(err);
    }
}

async function doctorsBySpecialty(req: Request, res: Response, next: NextFunction) {
    const { specialty } = req.params;
    try {
        const { rows: doctors } = await patientServices.doctorsBySpecialty({ specialty });
        return res.send({ doctors });
    } catch (err) {
        next(err);
    }
}

export default{
    createPatient,
    signIn,
    doctorsByName,
    doctorsByLocation,
    doctorsBySpecialty
}