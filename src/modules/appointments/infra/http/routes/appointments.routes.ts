import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Como todas as rotas precisam de autenticação, utilizamos o use passando nosso middleware, ele aplica em todas as rotas de agendamentos.
appointmentsRouter.use(ensureAuthenticated);

/*
appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});
*/

appointmentsRouter.post('/', async (request, response) => {
    // pega de dentro do request.body os dados que o usuario vai utilizar para criar um novo agendamento

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
