import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript!');

});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

