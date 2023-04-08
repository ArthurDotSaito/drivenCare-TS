
export type AppointmentType = {
    id:number,
    day: string,
    hour: string,
    userId:string,
    doctorId:number,
    confirmed:boolean,
    canceled:boolean,
}

export type CreateAppointmentType = Pick<AppointmentType, "day" | "hour" | "doctorId"> & { userId?: string; };
export type VerifyPatientAppointmentType = Pick<AppointmentType, "userId"> & { day?: string; };
export type FindAndConfirmOrCancelType = Pick<AppointmentType, "id" | "userId"> & { day?: string, status?:boolean};
export type FindScheduleType = Pick<AppointmentType, "id"> & { day?: string, confirmed?:boolean, canceled?:boolean};