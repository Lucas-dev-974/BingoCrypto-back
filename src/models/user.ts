
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { BingoCard } from './BingoCard';

@Table
export class User extends Model<User> {
  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  verifiedEmail?: boolean;

  @Column
  password!: string;


  @HasMany(() => BingoCard)
  bingoCard!: BingoCard[];
}