import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

// Passamos o model como parametro para o decorator e para a interface Repository
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
    implements IAppointmentsRepository {
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        // acha um appointment que a data é igual a data passada como parametro acima
        const findAppointment = await this.findOne({
            where: { date },
        });

        // se tiver o findAppointment ele é retornado direto, se não retorna undefined
        return findAppointment;
    }
}

export default AppointmentsRepository;
