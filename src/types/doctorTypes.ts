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

type DoctorPromise = {
    id:number,
    email:string,
    specialty:string,
    state:string,
    city:string,
    address: string
}

export type DoctorPromiseType = Promise<QueryResult<DoctorPromise>>