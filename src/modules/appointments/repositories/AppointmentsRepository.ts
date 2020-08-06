import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

// Passamos o model como parametro para o decorator e para a interface Repository
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        // acha um appointment que a data é igual a data passada como parametro acima
        const findAppointment = await this.findOne({
            where: { date },
        });

        // se tiver o findAppointment ele é retornado direto, se não retorna null
        return findAppointment || null;
    }
}

export default AppointmentsRepository;
