import { DataTypes } from "sequelize";
import { Model, Table, Column } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "Users",
})
export class User extends Model<User> {
  @Column({ type: DataTypes.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  password!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  updatedAt!: Date;
}

export default User;
