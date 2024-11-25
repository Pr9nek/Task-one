import {
    DataTypes,
    Model
} from 'sequelize';
import db from '../db';
import {
    Stock
} from '../inventory/inventory.model';

class StockHistory extends Model {}

StockHistory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stockId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Stock,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Stock,
            key: 'productId',
        },
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    plu: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shopId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'StockHistory',
});

export default StockHistory;