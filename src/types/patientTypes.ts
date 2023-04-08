import { QueryResult } from "pg"

export type PatientRegistry = {
    name: string,
    email:string,
    password:string
}

export type PatientId = {
    userId: string
}

type PatientPromise = {
    id:number,
    name:string,
    email:string
}

export type PatientPromiseType = Promise<QueryResult<PatientPromise>>