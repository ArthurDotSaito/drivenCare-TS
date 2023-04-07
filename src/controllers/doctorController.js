import doctorServices from "../services/doctorServices.js";

async function createDoctor(req, res, next){
    const {name, email, password, specialty, state, city, address} = req.body
    try{
        await doctorServices.createDoctor({name, email, password, specialty, state, city, address});
        return res.sendStatus(201);
    }catch(error){
        next(error);
    }
}

async function signIn(req, res, next){
    const {email, password} = req.body;
    try{
        const token = await doctorServices.signIn({email, password});
        return res.send({token});
    }catch(error){
        next(error)
    }
}

export default {createDoctor, signIn}