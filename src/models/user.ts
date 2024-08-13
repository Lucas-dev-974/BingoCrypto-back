
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

  @Column
  gender?: string;

  @Column
  birthday!: Date;


  @Column
  country?: string;

  @Column
  city?: string;

  @Column
  postal?: string;

  @Column
  phone?: string;

  @Column
  address?: string;

  @HasMany(() => BingoCard)
  bingoCard!: BingoCard[];
}