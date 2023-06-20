import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import {User} from "./User";
import {Center} from "./Center";

@Table
export class Rating extends Model<Rating>{
  @Column
  rating!: number

  @ForeignKey(() => User)
  @Column
  user_id!: number

  @BelongsTo(() => Center, 'center_id')
  center: Center  
}
