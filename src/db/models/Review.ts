import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { Recipe } from '.';

interface ReviewAttributes {
    id: number;
    author: string;
    description: string;
    title: string;
    isPublished: boolean;
    publishedOn: Date | null;
    rating: number;
    RecipeId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ReviewInput extends Optional<ReviewAttributes, 'id'> {}
export interface ReviewOuput extends Required<ReviewAttributes> {}

class Review extends Model<ReviewAttributes, ReviewInput> implements ReviewAttributes {
    
    public id!: number;
    public author!: string;
    public description!: string;
    public title!: string;
    public isPublished!: false;
    public publishedOn!: Date;
    public rating!: number;
    public RecipeId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Review.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_published',
    },
    publishedOn: {
        type: DataTypes.DATE,
        field: 'published_on',
    },
    rating: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    RecipeId: {
        type: DataTypes.BIGINT,
        field: 'recipe_id',
        allowNull: false,
        references: {
            model: Recipe,
            key: 'id'
        }
    },
}, {
    tableName: "tc_review",
    paranoid: false,
    timestamps: false,
    sequelize: sequelizeConnection
});

// Review.belongsTo(Recipe, {
//     foreignKey: {
//         allowNull: false,
//     }
// });

export default Review;