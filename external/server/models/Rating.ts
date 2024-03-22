import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import {User} from "./User";
import {Center} from "./Center";
import { IntegerDataType } from 'sequelize';

@Table
export class Rating extends Model<Rating>{
  @Column(DataType.NUMBER)
  rating!: number

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  user_id!: number

  @BelongsTo(() => Center, 'center_id')
  center!: Center  

  // constructor() {
  //   super();
  //   this.rating = 0;

  // }
}


