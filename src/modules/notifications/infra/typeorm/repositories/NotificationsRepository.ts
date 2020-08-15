import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
    // Essa Variavél é um repositório do typeorm da nossa entidade de appointments
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<Notification> {
        // cria uma notificação
        const notification = this.ormRepository.create({
            content,
            recipient_id,
        });

        // Salva o appointment no banco de dados
        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
