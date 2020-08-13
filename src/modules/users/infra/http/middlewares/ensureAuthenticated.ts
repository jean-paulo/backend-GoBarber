import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // Validação do Token JWT

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // Bearer token
    // Divide o token no espaço
    // se não vamos utilizar uma variável na desestruturação do js, podemos deixá-la em branco, só deixar a virgula.
    const [, token] = authHeader.split(' ');

    // o método verify do jwt nos devolve o token decodificado
    try {
        const decoded = verify(token, authConfig.jwt.secret);

        // Quando queremos forçar um formato pra variavel utilizamos 'as'
        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
