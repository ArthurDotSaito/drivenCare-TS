import patientServices from '../services/patientServices.js'

async function createPatient(req, res, next){
    const {name, email, password} = req.body
    try{
        await patientServices.createPatient({name, email, password});
        return res.sendStatus(201);
    }catch(error){
        next(error);
    }
}

async function signIn(req, res, next){
    const {email, password} = req.body;
    try{
        const token = await patientServices.signIn({email, password});
        return res.send({token});
    }catch(error){
        next(error)
    }
}

async function doctorsByName(req, res, next) {
    const { name } = req.params;
    try {
        const { rows: doctors } = await patientServices.doctorsByName({ name });
        return res.send({ doctors });
    } catch (err) {
        next(err);
    }
}

async function doctorsByLocation(req, res, next) {
    const { city }  = req.params;
    try {
        const { rows: doctors } = await patientServices.doctorsByLocation({ city });
        return res.send({ doctors });
    } catch (err) {
        next(err);
    }
}

async function doctorsBySpecialty(req, res, next) {
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