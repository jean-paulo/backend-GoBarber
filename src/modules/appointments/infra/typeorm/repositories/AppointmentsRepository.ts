import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    // Essa Variavél é um repositório do typeorm da nossa entidade de appointments
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        // acha um appointment que a data é igual a data passada como parametro acima
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        // se tiver o findAppointment ele é retornado direto, se não retorna undefined
        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        // cria o appointment
        const appointment = this.ormRepository.create({ provider_id, date });

        // Salva o appointment no banco de dados
        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
