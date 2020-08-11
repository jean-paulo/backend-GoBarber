import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

/* Toda vez que tiver uma injeção de dependencia com o nome HashProvider vai retornar
 uma instância da classe BCryptHashProvider */
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
