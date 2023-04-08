import { QueryResult } from "pg"

export type DoctorRegistration = {
    name: string,
    email:string,
    password:string,
    specialty:string,
    state:string,
    city:string,
    address: string
}

export type DoctorsByName = {
    name:string
}

export type DoctorsByLocation = {
    city:string
}

export type DoctorsBySpecialty = {
    specialty:string
}

type DoctorPromise = {
    id:number,
    email:string,
    specialty:string,
    state:string,
    city:string,
    address: string
}

export type DoctorPromiseType = Promise<QueryResult<DoctorPromise>>