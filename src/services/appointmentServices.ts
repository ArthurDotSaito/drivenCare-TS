import appointmentRepositories from "../repositories/appointmentRepositories.js";
import errors from '../errors/index.js';
import dayjs from "dayjs";
import patientRepositories from "../repositories/patientRepositories.js";
import doctorRepositories from "../repositories/doctorRepositories.js";
import { CreateAppointmentType, FindAndConfirmOrCancelType, FindScheduleType, VerifyPatientAppointmentType } from "../types/appointmentTypes.js";

async function createAppointment({userId, doctorId, day, hour }:CreateAppointmentType){
    const { rowCount } = await appointmentRepositories.findDuplicate({doctorId, day, hour});
    if(rowCount) throw errors.duplicatedAppointmentError();
    await appointmentRepositories.createAppointment({userId, doctorId, day, hour})
}

async function verifyPatientScheduledAppointments({userId}:VerifyPatientAppointmentType){
    const day = dayjs().format("YYYY-MM-DD");
    return await appointmentRepositories.verifyPatientScheduledAppointments({day, userId});
}

async function verifyDoctorScheduledAppointments({userId}:VerifyPatientAppointmentType){
    const day = dayjs().format("YYYY-MM-DD");
    return await appointmentRepositories.verifyDoctorScheduledAppointments({day, userId});
}

async function confirmAppointment({userId, id}:FindAndConfirmOrCancelType){
    const {rowCount} = await appointmentRepositories.findAppointmentById({status: false, userId, id});
    if(!rowCount) throw errors.appointmentNotFound();

    await appointmentRepositories.confirmAppointment({status: true, userId, id})
}

async function cancelAppointment({userId, id}:FindAndConfirmOrCancelType){
    const {rowCount} = await appointmentRepositories.findAppointmentById({status:true, userId, id});
    if(!rowCount) throw errors.appointmentNotFound();

    await appointmentRepositories.cancelAppointment({status:true, userId, id})
}

async function deleteAppointment({userId, id}:FindAndConfirmOrCancelType){
    const {rowCount} = await appointmentRepositories.findAppointmentById({status:true, userId, id});
    if(!rowCount) throw errors.appointmentNotFound();

    await appointmentRepositories.deleteAppointment({userId, id})
}


async function scheduleHistory({ id }:FindScheduleType){
    const day = dayjs().format("YYYY-MM-DD");

    const { rowCount } = await patientRepositories.findById(id);
    if(!rowCount) throw errors.patientNotFound();

    return appointmentRepositories.scheduleHistory({id, day, confirmed:true, canceled:false})
}

async function findDoctorSchedule({ id }:FindScheduleType) {
    const day = dayjs().format("YYYY-MM-DD");
    const { rowCount } = await doctorRepositories.findById(id);
    if (!rowCount) throw errors.doctorNotFound();
    
    return await appointmentRepositories.findDoctorSchedule({id, day})
}

export default { 
    createAppointment,
    verifyPatientScheduledAppointments,
    verifyDoctorScheduledAppointments,
    confirmAppointment,
    cancelAppointment,
    scheduleHistory,
    findDoctorSchedule,
    deleteAppointment}