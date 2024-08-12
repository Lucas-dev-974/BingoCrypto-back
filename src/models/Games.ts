
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { BingoCard } from './BingoCard';
import { DrawnNumber } from './DrawnNumber';

@Table
export class Games extends Model<Games> {
  @Column
  name!: string;

  @Column
  startedAt!: Date;

  @Column
  endedAt?: Date;

  @HasMany(() => DrawnNumber)
  drawnNumbers!: DrawnNumber[];

  // @Column
  // password!: string;


  // @HasMany(() => BingoCard)
  // bingoCard!: BingoCard[];
}