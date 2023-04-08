import httpStatus from "http-status";
import { Request, Response, NextFunction} from "express";

export function handleApplicationErrors(err:Error, req:Request, res:Response, next:NextFunction) {
  if (err.name === "UnprocessableEntityError" || err.name === "duplicateEmailError") {
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: err.message});
  }

  if (err.name === "InvalidCredentialError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({ 
      message: err.message, 
    });
  }

  if (err.name === "DuplicatedAppointmentError") {
    return res.status(httpStatus.CONFLICT).send({ 
      message: err.message, });
  }

  if (err.name === "appointmentNotFound") {
    return res.status(httpStatus.NOT_FOUND).send({ 
      message: err.message, });
  }

  if (err.name === "patiententNotFound") {
    return res.status(httpStatus.NOT_FOUND).send({ 
      message: err.message, });
  }

  if (err.name === "doctorNotFound") {
    return res.status(httpStatus.NOT_FOUND).send({ 
      message: err.message, });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}