import connection from '../config/databaseConnection.js'
import { DoctorPromiseType, DoctorRegistration } from '../types/doctorTypes.js';

async function createDoctor({name, email, password, specialty, state, city, address}: DoctorRegistration):Promise<void>{
    await connection.query({
        text:`INSERT INTO doctors (name, email, password, specialty, state, city, address) 
        VALUES ($1, $2, $3, $4, $5 ,$6, $7 )`,
        values: [name, email, password, specialty, state, city, address ]
    });
}

async function findByEmail(email:string){
    return await connection.query(`SELECT * FROM doctors WHERE email = $1`, [email]);
}

async function findById(id:number): DoctorPromiseType{
    return await connection.query(`SELECT * FROM doctors WHERE id = $1`, [id]);
}

async function findByName(name:string) : DoctorPromiseType{
    return await connection.query(` SELECT id, name, specialty, state, city, address FROM doctors WHERE name LIKE $1`,[name]);
}

async function findByLocation(city:string): DoctorPromiseType{
    return await connection.query(` SELECT id, name, specialty, state, city, address FROM doctors WHERE city LIKE $1`,[city]);
}

async function findBySpecialty(specialty:string): DoctorPromiseType{
    return await connection.query(` SELECT id, name, specialty, state, city, address FROM doctors WHERE specialty LIKE $1`,[specialty]);
}

export default {
    createDoctor, 
    findByEmail, 
    findById, 
    findByName,
    findByLocation,
    findBySpecialty}