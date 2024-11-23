import express from 'express';
import inventoryController from './inventory.controller';

const inventoryRouter = express.Router();

inventoryRouter.post('/products', inventoryController.addProduct);
inventoryRouter.post('/stocks', inventoryController.addStock); // Используем /stocks
inventoryRouter.patch('/stocks/:id/increase', inventoryController.updateStockIncrease); // Используем /stocks/:id
inventoryRouter.patch('/stocks/:id/decrease', inventoryController.updateStockDecrease); // Используем /stocks/:id
inventoryRouter.get('/stocks', inventoryController.getStocks); // Используем /stocks
inventoryRouter.get('/products', inventoryController.getProducts);
inventoryRouter.delete('/products/:id', inventoryController.deleteProduct);
inventoryRouter.delete('/stocks/:id', inventoryController.deleteStock); // Используем /stocks/:id

export default inventoryRouter;