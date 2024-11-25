import router from './router.js';
import express from 'express';
import db from './db';
import errorHandler from './middlewares/error-handler';

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.use(errorHandler);

(async () => {
    try {
        await db.authenticate();
        console.log('Connection to the database has been established successfully.');

        if (process.env.DB_SYNCHRONIZE === 'true') {
            await db.sync();
            console.log('Database synchronized.');
        }

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error); 
    }
})();