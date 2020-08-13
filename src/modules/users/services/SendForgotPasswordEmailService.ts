import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        // Verifica se o usuario existe
        if (!user) {
            throw new AppError('User does not exists.');
        }

        // Gera o token
        const { token } = await this.userTokensRepository.generate(user.id);

        await this.mailProvider.sendMail(
            email,
            `Pedido de recuperação de senha recebido. ${token}`,
        );
    }
}

export default SendForgotPasswordEmailService;