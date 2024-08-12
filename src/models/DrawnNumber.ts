
import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BingoCard } from './BingoCard';
import { Games } from './Games';

@Table
export class DrawnNumber extends Model<DrawnNumber> {
  @Column
  number!: number;

  @Column
  drawnAt!: Date


  // Clé étrangère pour l'utilisateur
  @ForeignKey(() => Games)
  @Column
  userId!: number;

  @BelongsTo(() => Games)
  user!: Games;
  // @Column
  // password!: string;

  // @HasMany(() => BingoCard)
  // bingoCard!: BingoCard[];
}