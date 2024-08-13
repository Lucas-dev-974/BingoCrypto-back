
import { Table, Column, Model, HasMany, HasOne, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table
export class BingoCard extends Model<BingoCard> {
  @Column({ type: DataType.ARRAY(DataType.ARRAY(DataType.INTEGER)) })
  number!: number[][];

  // Clé étrangère pour l'utilisateur
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}