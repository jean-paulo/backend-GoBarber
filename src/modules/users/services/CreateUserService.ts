import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        // Verifica se o email já não está sendo utilizado
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already in use.');
        }

        const hashedPassword = await hash(password, 8);

        // Se a verificação passar, cria o usuário e salva
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }
}

export default CreateUserService;
