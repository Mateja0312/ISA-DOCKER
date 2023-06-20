import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import {User} from "./User";
import {Center} from "./Center";
import { Feedback } from './Feedback';

@Table
export class FeedbackResponse extends Model<FeedbackResponse>{
  @Column
  response: string;

  @Column
  respondedBy: number;

  @BelongsTo(() => Feedback, 'feedback_id')
  feedback: Feedback;
}
