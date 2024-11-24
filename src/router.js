import express from 'express';
import inventoryRouter from './inventory/inventory.router';
import historyRouter from './history/history.router';

const router = express.Router();

router.use('/inventory', inventoryRouter);
router.use('/history', historyRouter);

export default router;