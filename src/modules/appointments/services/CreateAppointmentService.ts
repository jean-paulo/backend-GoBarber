import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
    provider_id: string;
    date: Date;
}

// esse decorator precisa ter em toda classe que vai ter inj de dependencias
@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        // verifica se o appointment está disponivel
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        // se não estiver ele devolve um erro
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        // se estiver disponível ele cria e retorna o appointment -> ele cria mas não salva no banco de dados
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
