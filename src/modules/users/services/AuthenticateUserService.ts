import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

// precisamos do repositório para verificar se o email existe
class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        // se o usuario não for encontrado devolve um erro
        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // user.password - Senha criptografada
        // password - Senha não-criptografada

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // se chegou até aqui, usuário autenticado

        // gera o token JWT
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
