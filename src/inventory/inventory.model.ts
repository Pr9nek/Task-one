import {
    DataTypes,
    Model
} from 'sequelize';
import {
    sequelize
} from '../db';

class Product extends Model {
    declare id: number;
    declare plu: string;
    declare name: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    plu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Product',
});

// Модель Stock
class Stock extends Model {
    declare id: number;
    declare productId: number;
    declare shopId: number;
    declare shelfQty: number;
    declare orderQty: number;
}

Stock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        shopId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shelfQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        orderQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'Stock',
    }
);

export { Product, Stock }; 