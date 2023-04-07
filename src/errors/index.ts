function unprocessableEntity(message){
    return{
        name: "UnprocessableEntityError",
        message
    };
}

function duplicatedEmailError(email){
    return{
        name:"duplicateEmailError",
        message:"There is another user with given e-mail",
        email,
    };
}

function invalidCredentialError(){
    return{
        name: "InvalidCredentialError",
        message:"e-mail or password are incorrect"
    };
}

function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must sign in to continue"
    };
}

function duplicatedAppointmentError() {
    return {
        name: "duplicatedAppointmentError",
        message: "There's already another appointment schedule for selected time"
    };
}

function appointmentNotFound() {
    return {
        name: "appointmentNotFound",
        message: "The selected appointment was not found"
    };
}

function patientNotFound() {
    return {
        name: "patiententNotFound",
        message: "The selected patient was not found"
    };
}

function doctorNotFound() {
    return {
        name: "doctorNotFound",
        message: "The selected doctor was not found"
    };
}

export default{
    unprocessableEntity,
    duplicatedEmailError,
    invalidCredentialError,
    unauthorizedError,
    duplicatedAppointmentError, 
    appointmentNotFound,
    patientNotFound}