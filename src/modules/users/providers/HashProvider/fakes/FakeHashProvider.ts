import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    // Compara a senha não criptografada com a senha criptografada
    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return payload === hashed;
    }
}
