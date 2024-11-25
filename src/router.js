import express from 'express';
import inventoryRouter from './inventory/inventory.router.ts';
import historyRouter from './history/history.router.js';

const router = express.Router();

router.use('/inventory', inventoryRouter);
router.use('/history', historyRouter);

export default router;