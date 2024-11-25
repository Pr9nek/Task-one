import { Request, Response } from 'express';

interface IError extends Error {
    statusCode?: number;
}

const errorHandler = (err: IError, req: Request, res: Response) => {
    console.error(err.stack); // Логируем ошибку в консоль

    const statusCode = err.statusCode || 500;
    const message = err.message || 'На сервере произошла ошибка';

    res.status(statusCode)
        .send({
        message: message,
    });
};

export default errorHandler;