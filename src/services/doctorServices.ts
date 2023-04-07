import doctorRepositories from '../repositories/doctorRepositories.js'
import errors from '../errors/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function createDoctor({name, email, password, specialty, state, city, address}){
    const { rowCount } = await doctorRepositories.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    await doctorRepositories.createDoctor({name, email, password: hashPassword, specialty, state, city, address});
}

async function signIn({email, password}){
    const {rowCount, rows: [user]} = await doctorRepositories.findByEmail(email);
    if(!rowCount) throw errors.invalidCredentialError();

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) throw errors.invalidCredentialError();

    const token = jwt.sign({userId: user.id}, process.env.SECRET_JWT);

    return token
}

export default {createDoctor, signIn}