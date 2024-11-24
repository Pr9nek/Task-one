import express from 'express';
import historyController from './history.controller.js'; 

const historyRouter = express.Router();

historyRouter.post('/', historyController.createHistoryRecord);
historyRouter.get('/', historyController.getHistory);

export default historyRouter; 