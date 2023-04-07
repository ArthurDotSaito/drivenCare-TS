import appointmentServices from "../services/appointmentServices.js";

async function createAppointment(req, res, next){
    const { doctorId, day, hour} = req.body;
    const user = res.locals.user;

    try{
        await appointmentServices.createAppointment({userId:user.id, doctorId, day, hour});
        return res.sendStatus(202);
    }catch(err){
        next(err);
    }
}

async function verifyPatientScheduledAppointments(req, res, next){
    const user = res.locals.user;
    try{
        const {rows: schedule } = await appointmentServices.verifyPatientScheduledAppointments({ userId: user.id});
        return res.send({schedule});
    }catch(err){
        next(err);
    }
}

async function verifyDoctorScheduledAppointments(req, res, next){
    const user = res.locals.user;
    try{
        const {rows: schedule } = await appointmentServices.verifyDoctorScheduledAppointments({ userId: user.id});
        return res.send({schedule});
    }catch(err){
        next(err);
    }
}

async function confirmAppointment(req, res, next){
    try{
        const id = Number(req.params.id);
        const user = res.locals.user;

        await appointmentServices.confirmAppointment({userId: user.id, id})
        return res.sendStatus(202);
    }catch(err){
        next(err)
    }
}

async function cancelAppointment(req, res, next){
    try{
        const id = Number(req.params.id);
        const user = res.locals.user;

        await appointmentServices.cancelAppointment({userId: user.id, id})
        return res.sendStatus(202);
    }catch(err){
        next(err)
    }
}

async function scheduleHistory(req, res, next){
    try{
        const { patientId } = req.params;
        const { rows: scheduleHistory } = await appointmentServices.scheduleHistory({id: patientId});
        
        return res.send({scheduleHistory})
    }catch(err){
        next(err)
    }
}

async function findDoctorSchedule(req, res, next){
    try{
        const { doctorId } = req.params;
        const { rows: schedule } = await appointmentServices.findDoctorSchedule({id: doctorId})
        
        return res.send({schedule})
    }catch(err){
        next(err)
    }
}

export default {
    createAppointment,
    verifyPatientScheduledAppointments,
    verifyDoctorScheduledAppointments, 
    confirmAppointment,
    cancelAppointment,
    scheduleHistory,
    findDoctorSchedule}