import appointmentRepositories from "../repositories/appointmentRepositories.js";
import errors from '../errors/index.js';
import dayjs from "dayjs";
import patientRepositories from "../repositories/patientRepositories.js";
import doctorRepositories from "../repositories/doctorRepositories.js";

async function createAppointment({userId, doctorId, day, hour }){
    const { rowCount } = await appointmentRepositories.findDuplicate({doctorId, day, hour});
    if(rowCount) throw errors.duplicatedAppointmentError();
    await appointmentRepositories.createAppointment({userId, doctorId, day, hour})
}

async function verifyPatientScheduledAppointments({userId}){
    const date = dayjs().format("YYYY-MM-DD");
    return await appointmentRepositories.verifyPatientScheduledAppointments({date, userId});
}

async function verifyDoctorScheduledAppointments({userId}){
    const date = dayjs().format("YYYY-MM-DD");
    return await appointmentRepositories.verifyDoctorScheduledAppointments({date, userId});
}

async function confirmAppointment({userId, id}){
    const {rowCount} = await appointmentRepositories.findAppointmentById({status: false, userId, id});
    if(!rowCount) throw errors.appointmentNotFound();

    await appointmentRepositories.confirmAppointment({status: true, userId, id})
}

async function cancelAppointment({userId, id}){
    const {rowCount} = await appointmentRepositories.findAppointmentById({status:true, userId, id});
    if(!rowCount) throw errors.appointmentNotFound();

    await appointmentRepositories.cancelAppointment({status:true, userId, id})
}

async function scheduleHistory({ id }){
    const date = dayjs().format("YYYY-MM-DD");

    const { rowCount } = await patientRepositories.findById(id);
    if(!rowCount) throw errors.patientNotFound();

    return appointmentRepositories.scheduleHistory({id, date, confirmed:true, canceled:false})
}

async function findDoctorSchedule({ id }) {
    const date = dayjs().format("YYYY-MM-DD");
    const { rowCount } = await doctorRepositories.findById(id);
    if (!rowCount) throw errors.doctorNotFound();
    
    return await appointmentRepositories.findDoctorSchedule({id, date})
}

export default { 
    createAppointment,
    verifyPatientScheduledAppointments,
    verifyDoctorScheduledAppointments,
    confirmAppointment,
    cancelAppointment,
    scheduleHistory,
    findDoctorSchedule}