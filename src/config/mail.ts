interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'equipe@gobarber.com.br', // aqui vai o e-mail que você quer utilizar no ambiente de produção
            name: 'Jean Paulo Equipe GoBarber',
        },
    },
} as IMailConfig;
