import {
    StockHistory
} from './history.model.js';
import {
    Op
} from 'sequelize';

class HistoryService {
    async createHistoryRecord(data) {
        const historyRecord = await StockHistory.create(data);
        return historyRecord;
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