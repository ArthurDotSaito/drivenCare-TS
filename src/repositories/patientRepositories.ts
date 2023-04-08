import connection from '../config/databaseConnection.js'
import { PatientPromiseType, PatientRegistry } from '../types/patientTypes.js';

async function createPatient({name, email, password}:PatientRegistry):Promise<any>{
    await connection.query({
        text:'INSERT INTO patients (name, email, password) VALUES ($1, $2, $3)',
        values: [name, email, password]
    });
}

async function findByEmail(email:String){
    return await connection.query(`SELECT * FROM patients WHERE email = $1`, [email]);
}

async function findById(id:number):Promise<PatientPromiseType>{
    return await connection.query(`SELECT * FROM patients WHERE id = $1`, [id]);
}

export default {createPatient, findByEmail, findById}