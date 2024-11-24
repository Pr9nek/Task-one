import express from 'express';
import router from './router';
import errorHandler from './middlewares/error-handler';
import { sequelize } from './db';

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.use(errorHandler);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        if (process.env.DB_SYNCHRONIZE === 'true') {
            await sequelize.sync();
            console.log('Database synchronized.');
        }

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error); 1
    }
})();