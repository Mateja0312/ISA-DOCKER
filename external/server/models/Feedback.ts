'use strict';

import { BelongsTo, Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Center } from './Center';
import { FeedbackResponse } from './FeedbackResponse';
import { User } from "./User";

  @Table
  export class Feedback extends Model<Feedback>{

    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.STRING)
    content!: string;

    @BelongsTo(() => User, 'client_id')
    client!: User;

    @BelongsTo(() => User, 'employee_id')
    employee!: User;

    @BelongsTo(() => Center, 'center_id')
    center!: Center;

    @HasOne(() => FeedbackResponse, 'feedback_id')
    feedback_response!: FeedbackResponse; 
  }