import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        // Verifica se o email já não está sendo utilizado
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already in use.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        // Se a verificação passar, cria o usuário e salva
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.cacheProvider.invalidatePrefix('providers-list');

        return user;
    }
}

export default CreateUserService;
