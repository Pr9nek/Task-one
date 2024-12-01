import { Request, Response, NextFunction } from 'express';
import inventoryService from './inventory.service';

interface GetStocksQuery {
    plu?: string;
    shopId?: number;
    shelfQtyFrom?: number;
    shelfQtyTo?: number;
    orderQtyFrom?: number;
    orderQtyTo?: number;
}

class InventoryController {
    async addProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { plu, name } = req.body;
            const product = await inventoryService.createProduct({ plu, name });
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async addStock(req: Request, res: Response, next: NextFunction) {
        try {
            const { productId, shopId, shelfQty, orderQty } = req.body;
            const stock = await inventoryService.createStock({
                productId,
                shopId,
                shelfQty,
                orderQty,
            });
            res.status(201).json(stock);
        } catch (error) {
            next(error);
        }
    }

    async updateStockIncrease(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const stock = await inventoryService.increaseStock(Number(id), quantity);
            res.json(stock);
        } catch (error) {
            next(error);
        }
    }

    async updateStockDecrease(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const stock = await inventoryService.decreaseStock(Number(id), quantity);
            res.json(stock);
        } catch (error) {
            next(error);
        }
    }

    async getStocks(
        req: Request<{}, {}, {}, GetStocksQuery>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { plu, shopId, shelfQtyFrom, shelfQtyTo, orderQtyFrom, orderQtyTo } = req.query;
            const stocks = await inventoryService.getStocks({
                plu,
                shopId,
                shelfQtyFrom,
                shelfQtyTo,
                orderQtyFrom,
                orderQtyTo,
            });
            res.json(stocks);
        } catch (error) {
            next(error);
        }
    }

    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, plu } = req.query;
            const products = await inventoryService.getProducts({
                name: name ? String(name) : undefined,
                plu: plu ? String(plu) : undefined,
            });
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    // async deleteProduct(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { id } = req.params;
    //         await inventoryService.deleteProduct(Number(id));
    //         res.status(204).send();
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async deleteStock(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { id } = req.params;
    //         await inventoryService.deleteStock(Number(id));
    //         res.status(204).send();
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export default new InventoryController();