import { Product, Stock } from './inventory.model';
import { Op } from 'sequelize';
import axios from 'axios';

const HISTORY_SERVICE_URL = 'http://localhost:3000/history'; 
interface GetStocksParams {
    plu?: string;
    shopId?: number;
    shelfQtyFrom?: number;
    shelfQtyTo?: number;
    orderQtyFrom?: number;
    orderQtyTo?: number;
}

interface GetProductsParams {
    name?: string;
    plu?: string;
}

class InventoryService {
    async createProduct(productData: { plu: string; name: string }) {

        try {
            const product = await Product.create(productData);
    
            if (product && product.id) {
                await axios.post(HISTORY_SERVICE_URL, {
                    productId: product.id,
                    action: 'product_creation',
                    quantity: 1,
                    plu: product.plu,
                    stockId: null, 
                });
            }   

            return product;
        } catch (error) {
            console.error('Error creating product or history record:', error);
            throw error;
        }
    }

    async createStock(stockData: {
        productId: number;
        shopId: number;
        shelfQty: number;
        orderQty: number;
    }) {
        const stock = await Stock.create(stockData);
        const product = await Product.findByPk(stockData.productId);

        try {
            await axios.post(HISTORY_SERVICE_URL, {
                stockId: stock.id,
                action: 'stock_creation',
                quantity: stock.shelfQty + stock.orderQty,
                shopId: stockData.shopId,
                plu: product?.plu,
                productId: product?.id,
            });
        } catch (error) {
            console.error('Ошибка отправки сообщения в сервис истории:', error);
            throw error;
        }

        return stock;
    }

    async getStocks(params: GetStocksParams) {
        const { plu, shopId, shelfQtyFrom, shelfQtyTo, orderQtyFrom, orderQtyTo } = params;
        const whereClause: any = {}; // Условие для таблицы Stock
    
        if (shopId) {
            whereClause.shopId = shopId;
        }
    
        if (shelfQtyFrom) {
            whereClause.shelfQty = { [Op.gte]: shelfQtyFrom };
        }
        if (shelfQtyTo) {
            whereClause.shelfQty = {
                ...whereClause.shelfQty,
                [Op.lte]: shelfQtyTo,
            };
        }
    
        if (orderQtyFrom) {
            whereClause.orderQty = { [Op.gte]: orderQtyFrom };
        }
        if (orderQtyTo) {
            whereClause.orderQty = {
                ...whereClause.orderQty,
                [Op.lte]: orderQtyTo,
            };
        }
    
        const include: any[] = [];
        if (plu) {
            include.push({
                model: Product,
                as: 'product', 
                where: { plu }, 
            });
        } else {
            include.push({
                model: Product,
                as: 'product', 
            });
        }
    
        const stocks = await Stock.findAll({
            where: whereClause,
            include, 
        });
    
        return stocks;
    }
    

    async getProducts(params: GetProductsParams) {
        const { name, plu } = params;
        const whereClause: any = {};

        if (name) {
            console.log("Искомое имя продукта:", name); 
            whereClause.name = { [Op.iLike]: `%${name}%` };
            console.log("whereClause для поиска продуктов:", JSON.stringify(whereClause)); 
        }
        if (plu) {
            whereClause.plu = plu;
        }

        try {
            const products = await Product.findAll({
                where: whereClause,
            });
            console.log("Найденные продукты:", products.map(product => product.toJSON())); 
            return products;
        } catch (error) {
            console.error("Ошибка при поиске продуктов:", error);
            throw error; 
        }
    }

    async increaseStock(id: number, quantity: number) {
        const stock = await Stock.findByPk(id);
        if (!stock) {
            throw new Error('Остаток не найден');
        }

        await stock.increment('shelfQty', { by: quantity });
        const updatedStock = await stock.reload();

        try {
            const product = await Product.findByPk(stock.productId); // Получаем товар
            await axios.post(HISTORY_SERVICE_URL, {
                stockId: stock.id,
                action: 'increase',
                quantity: quantity,
                shopId: stock.shopId, // Добавляем shopId
                plu: product?.plu, // Добавляем plu (с проверкой на null)
            });
        } catch (error) {
            console.error('Ошибка отправки сообщения в сервис истории:', error);
        }

        return updatedStock;
    }

    async decreaseStock(id: number, quantity: number) {
        const stock = await Stock.findByPk(id);
        if (!stock) {
            throw new Error('Остаток не найден');
        }

        await stock.decrement('shelfQty', { by: quantity });
        const updatedStock = await stock.reload();

        try {
            const product = await Product.findByPk(stock.productId); // Получаем товар
            await axios.post(HISTORY_SERVICE_URL, {
                stockId: stock.id,
                action: 'decrease',
                quantity: quantity,
                shopId: stock.shopId, // Добавляем shopId
                plu: product?.plu, // Добавляем plu (с проверкой на null)
            });
        } catch (error) {
            console.error('Ошибка отправки сообщения в сервис истории:', error);
        }

        return updatedStock;
    }
     // async deleteProduct(id: number) {
    //     const product = await Product.findByPk(id);
    //     if (!product) {
    //         throw new Error('Товар не найден');
    //     }

    //     try {
    //         await axios.post(HISTORY_SERVICE_URL, {
    //             productId: product.id,
    //             action: 'product_deletion',
    //             quantity: 1,
    //             plu: product.plu, // Добавляем plu
    //         });
    //     } catch (error) {
    //         console.error('Ошибка отправки сообщения в сервис истории:', error);
    //     }

    //     await product.destroy();
    // }

    // async deleteStock(id: number) {
    //     const stock = await Stock.findByPk(id);
    //     if (!stock) {
    //         throw new Error('Остаток не найден');
    //     }

    //     try {
    //         const product = await Product.findByPk(stock.productId); // Получаем товар
    //         await axios.post(HISTORY_SERVICE_URL, {
    //             stockId: stock.id,
    //             action: 'stock_deletion',
    //             quantity: -(stock.shelfQty + stock.orderQty),
    //             shopId: stock.shopId, // Добавляем shopId
    //             plu: product?.plu, // Добавляем plu (с проверкой на null)
    //         });
    //     } catch (error) {
    //         console.error('Ошибка отправки сообщения в сервис истории:', error);
    //     }

    //     await stock.destroy();
    // }
}

export default new InventoryService();