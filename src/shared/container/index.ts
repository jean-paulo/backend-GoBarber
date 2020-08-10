import { container } from 'tsyringe';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// singleton é diferente do register, o register instanciaria varias vezes o singleton uma vez só e todos que precisarem usam a mesma instancia
// o nome que você quer dar ao repositório e o nome do repositório que ele referencia
container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
