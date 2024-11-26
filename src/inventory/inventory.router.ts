import express from 'express';
import InventoryController from './inventory.controller';
const inventoryRouter = express.Router();

inventoryRouter.post('/products', InventoryController.addProduct);
inventoryRouter.post('/stocks', InventoryController.addStock); // Используем /stocks
inventoryRouter.patch('/stocks/:id/increase', InventoryController.updateStockIncrease); // Используем /stocks/:id
inventoryRouter.patch('/stocks/:id/decrease', InventoryController.updateStockDecrease); // Используем /stocks/:id
inventoryRouter.get('/stocks', InventoryController.getStocks); // Используем /stocks
inventoryRouter.get('/products', InventoryController.getProducts);
// inventoryRouter.delete('/products/:id', InventoryController.deleteProduct);
// inventoryRouter.delete('/stocks/:id', InventoryController.deleteStock); 

export default inventoryRouter;