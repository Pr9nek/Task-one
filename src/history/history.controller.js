import historyService from './history.service.js';

class HistoryController {
    async createHistoryRecord(req, res, next) {
        try {
            const {
                stockId,
                productId,
                action,
                quantity,
                plu,
                shopId
            } = req.body;
            const historyRecord = await historyService.createHistoryRecord({
                stockId,
                productId,
                action,
                quantity,
                plu,
                shopId,
            });
            res.status(201).json(historyRecord);
        } catch (error) {
            next(error);
        }
    }

    async getHistory(req, res, next) {
        try {
            const {
                shopId,
                plu,
                dateFrom,
                dateTo,
                action,
                page = 1,
                limit = 10,
            } = req.query;

            const history = await historyService.getHistory({
                shopId: shopId ? Number(shopId) : undefined,
                plu: plu || undefined,
                dateFrom: dateFrom ? new Date(dateFrom) : undefined,
                dateTo: dateTo ? new Date(dateTo) : undefined,
                action,
                page: Number(page),
                limit: Number(limit),
            });
            res.json(history);
        } catch (error) {
            next(error);
        }
    }
}

export default new HistoryController();