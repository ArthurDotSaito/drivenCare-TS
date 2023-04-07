import doctorServices from "../services/doctorServices.js";
import { Request, Response, NextFunction } from "express";
import { DoctorRegistration } from "../types/doctorTypes.js";
import { LoginType } from "../types/loginTypes.js";

async function createDoctor(req: Request, res: Response, next: NextFunction){
    const {name, email, password, specialty, state, city, address} = req.body as DoctorRegistration
    try{
        await doctorServices.createDoctor({name, email, password, specialty, state, city, address});
        return res.sendStatus(201);
    }catch(error){
        next(error);
    }
}

async function signIn(req: Request, res: Response, next: NextFunction){
    const {email, password} = req.body as LoginType;
    try{
        const token = await doctorServices.signIn({email, password});
        return res.send({token});
    }catch(error){
        next(error)
    }
}

export default {createDoctor, signIn}