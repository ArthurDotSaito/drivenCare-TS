import connection from "../config/databaseConnection.js";

async function findDuplicate({doctorId, day, hour}){
    return await connection.query({
        text: `SELECT * FROM appointments WHERE doctor_id = $1 and appointmentday = $2
        AND (appointmenthour BETWEEN $3::time without time zone - INTERVAL '59 minutes' AND $3::time without time zone + INTERVAL '59 minutes')`,
        values:[doctorId, day, hour]
    })
}

async function createAppointment({userId, doctorId, day, hour }){
    return await connection.query({
        text:`INSERT INTO appointments (patient_id, doctor_id, appointmenthour, appointmentday) VALUES ($1, $2, $3, $4)`,
        values:[userId, doctorId, hour, day]
    })
}

async function verifyPatientScheduledAppointments({date, userId}){
    return await connection.query({
        text:
        `
        SELECT 
        a.id, p.name AS patient, d.name AS doctor, d.specialty, a.appointmentday AS day, a.appointmenthour AS hour,
        a.confirmed, a.canceled  
        FROM appointments a 
        JOIN patients p ON p.id = a.patient_id 
        JOIN doctors d ON d.id = a.doctor_id 
        WHERE a.patient_id = $1 AND a.appointmentday >= $2
        ORDER BY a.appointmenthour ASC
        `,
        values:[userId, date]
    });
}

async function verifyDoctorScheduledAppointments({date, userId}){
    return await connection.query({
        text:
        `
        SELECT 
        a.id, p.name AS patient, d.name AS doctor, d.specialty, a.appointmentday AS day, a.appointmenthour AS hour,
        a.confirmed, a.canceled  
        FROM appointments a 
        JOIN patients p ON p.id = a.patient_id 
        JOIN doctors d ON d.id = a.doctor_id 
        WHERE a.doctor_id = $1 AND a.appointmentday >= $2
        ORDER BY a.appointmenthour ASC
        `,
        values:[userId, date]
    });
}

async function findAppointmentById({status, userId, id}){
    return await connection.query({
        text:`SELECT * FROM appointments WHERE confirmed=$1 AND doctor_id=$2 AND id = $3`,
        values:[status, userId, id]
    });
}

async function confirmAppointment({status, userId, id}){
    return await connection.query({
        text:`UPDATE appointments SET confirmed=$1 WHERE doctor_id=$2 AND id=$3`,
        values:[status, userId, id]
    });
}

async function cancelAppointment({status, userId, id}){
    console.log("cancel")
    return await connection.query({
        text:`UPDATE appointments SET canceled=$1 WHERE doctor_id=$2 AND id=$3`,
        values:[status, userId, id]
    });
}

async function scheduleHistory({id, date, confirmed, canceled}){
    return await connection.query({
        text: `
        SELECT 
        a.id, p.name AS patient, d.name AS doctor, d.specialty, a.appointmentday AS day, a.appointmenthour AS hour,
        a.confirmed, a.canceled  
        FROM appointments a 
        JOIN patients p ON p.id = a.patient_id 
        JOIN doctors d ON d.id = a.doctor_id 
        WHERE a.patient_id = $1 AND a.appointmentday >= $2 AND a.confirmed= $3 AND a.canceled = $4
        ORDER BY a.appointmenthour ASC
        `,
        values:[id, date, confirmed, canceled]
    })
}

async function findDoctorSchedule({id, date}){
    return await connection.query({
        text:`SELECT a.id, d.name as doctor, d.specialty, a.appointmentday AS day, a.appointmenthour AS hour,
        a.confirmed
        FROM appointments a
        JOIN doctors d ON d.id = a.doctor_id
        WHERE a.doctor_id = $1 AND a.appointmentday >= $2
        ORDER BY a.appointmentday ASC`,
        values:[id, date]
    })
}

export default {
    findDuplicate, 
    createAppointment,
    verifyPatientScheduledAppointments,
    verifyDoctorScheduledAppointments,
    findAppointmentById,
    confirmAppointment,
    cancelAppointment,
    scheduleHistory,
    findDoctorSchedule}