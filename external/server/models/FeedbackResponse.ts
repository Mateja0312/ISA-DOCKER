import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import {User} from "./User";
import {Center} from "./Center";
import { Feedback } from './Feedback';

@Table
export class FeedbackResponse extends Model<FeedbackResponse>{
  @Column(DataType.STRING)
  response!: string;

  @Column(DataType.NUMBER)
  respondedBy!: number;

  @BelongsTo(() => Feedback, 'feedback_id')
  feedback!: Feedback;
}
