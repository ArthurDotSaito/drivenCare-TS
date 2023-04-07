import joi from 'joi';
import { validateDate } from '../middlewares/validateDate.js'
import { validateTime } from '../middlewares/validateTime.js'

export const appointmentSchema = joi.object({
    doctorId: joi.number().min(1).required(),
    day: joi.string().pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).required().custom(validateDate, 'custom date validation'),
    hour: joi.string().required().custom(validateTime, 'custom hour validation'),
}).messages({
    'custom date validation.invalid-date':'Invalid date format',
    'custom date validation.before-today':'It is not possible to schedule an appointment in the past',
    'custom date validation.weekend':'It is not possible to schedule an appointment in the weekend',
    'custom hour validation.invalid-time': 'Invalid time format',
    'custom hour validation.invalid-schedule-time':'you can only book appointments from 8am to 6pm'
});