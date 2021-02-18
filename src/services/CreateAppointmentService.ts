import {startOfHour} from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'

/**
 * [X] Receber informações
 * [X] Tratativa de erros/excessões
 * [X] Acesso ao repositório
 */

 /**
  * S - Single Responsability Principle
  * O 
  * L
  * I
  * D - Dependency Invertion Principal
  */

interface Request {
  provider: string; 
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 */

class CreateAppointmentService {
  
  public async execute({provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
  
    const findAppointmentInSameDate = appointmentsRepository.findByDate(appointmentDate);
  
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked!');
    }
  
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    });


    await appointmentsRepository.save(appointment);
  

    return appointment;
  }

}

export default CreateAppointmentService;