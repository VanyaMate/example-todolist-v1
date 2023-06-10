import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";

@Table({
    tableName: 'token',
    createdAt: false,
    updatedAt: false,
})
export class Token extends Model<Token> {

    @Column({ type: DataType.INTEGER, allowNull: false })
    @ForeignKey(() => User)
    user_id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    token: string;

}