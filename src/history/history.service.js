import StockHistory from './history.model.js';
import { Product } from '../inventory/inventory.model.js'; 
import {
    Op
} from 'sequelize';

class HistoryService {
    async createHistoryRecord(data) {

        // const historyRecord = await StockHistory.create(data);
        // return historyRecord;
        try {
            // Optional: Check if product exists before creating history record
            const product = await Product.findByPk(data.productId);
            
            if (!product) {
                console.warn(`Product with ID ${data.productId} not found`);
                // You might choose to not create the history record or handle this differently
                return null;
            }
    
            // const historyRecord = await StockHistory.create(data);
            // return historyRecord;

            // Создаем запись истории
        const historyRecord = await StockHistory.create({
            ...data,
            plu: data.plu || product.plu, // Если PLU не передано, берем из продукта
        });

        return historyRecord;
        
        } catch (error) {
            console.error('Error creating history record:', error);
            throw error;
        }
    }

    async getHistory(params) {
        const {
            shopId,
            plu,
            dateFrom, // Дата начала диапазона
            dateTo, // Дата окончания диапазона
            action,
            page = 1,
            limit = 10,
        } = params;
        const whereClause = {};

        if (shopId) {
            whereClause.shopId = shopId;
        }
        if (plu) {
            whereClause.plu = plu;
        }
        if (dateFrom && dateTo) { // Проверяем наличие обеих дат
            whereClause.date = {
                [Op.between]: [dateFrom, dateTo]
            }; // Используем Op.between
        } else {
            if (dateFrom) {
                whereClause.date = {
                    [Op.gte]: dateFrom
                };
            }
            if (dateTo) {
                whereClause.date = {
                    [Op.lte]: dateTo
                };
            }
        }
        if (action) {
            whereClause.action = action;
        }

        const history = await StockHistory.findAll({
            where: whereClause,
            offset: (page - 1) * limit,
            limit: limit,
            order: [
                ['date', 'DESC']
            ],
        });
        return history;
    }
}

export default new HistoryService();