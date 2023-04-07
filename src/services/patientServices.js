import patientRepositories from '../repositories/patientRepositories.js';
import doctorRepositories from '../repositories/doctorRepositories.js';
import errors from '../errors/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


async function createPatient({name, email, password}){
    const { rowCount } = await patientRepositories.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    await patientRepositories.createPatient({name, email, password: hashPassword});
}

async function signIn({email, password}){
    const {rowCount, rows: [user]} = await patientRepositories.findByEmail(email);
    if(!rowCount) throw errors.invalidCredentialError();

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw errors.invalidCredentialError();

    const token = jwt.sign({userId: user.id}, process.env.SECRET_JWT);

    return token
}

async function doctorsByName({name}){
    const doctorName = `%${name}%`;
    const doctors = await doctorRepositories.findByName(doctorName);

    return doctors
}

async function doctorsByLocation({city}){
    const doctorCity = `%${city}%`;
    const doctors = await doctorRepositories.findByLocation(doctorCity);

    return doctors
}

async function doctorsBySpecialty({specialty}){
    const doctorSpecialty = `%${specialty}%`;
    const doctors = await doctorRepositories.findBySpecialty(doctorSpecialty);

    return doctors
}

export default {createPatient, signIn, doctorsByName, doctorsByLocation, doctorsBySpecialty}