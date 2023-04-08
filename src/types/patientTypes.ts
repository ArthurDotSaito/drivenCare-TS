import { QueryResult } from "pg"

export type PatientRegistry = {
    name: string,
    email:string,
    password:string
}

type PatientPromise = {
    id:number,
    name:string,
    email:string
}

export type PatientPromiseType = Promise<QueryResult<PatientPromise>>