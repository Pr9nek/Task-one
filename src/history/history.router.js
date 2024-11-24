import express from 'express';
import historyController from './history.controller'; 

const historyRouter = express.Router();

historyRouter.post('/history', historyController.createHistoryRecord);
historyRouter.get('/history', historyController.getHistory);

export default historyRouter; 