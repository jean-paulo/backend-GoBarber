import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        // o rename é uma forma de movermos um arquivo, neste caso vai mover de temp para uploads
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch (err) {
            return;
        }

        // Se ele encontrou o arquivo no try ele deleta se não ele cai no erro
        await fs.promises.unlink(filePath);
    }
}
