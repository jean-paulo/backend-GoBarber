import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        // verifica se o appointment está disponivel
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        // se não estiver ele devolve um erro
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        // se estiver disponível ele cria e retorna o appointment -> ele cria mas não salva no banco de dados
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // salva o registro no banco de dados
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
