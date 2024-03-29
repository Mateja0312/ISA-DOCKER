'use strict';

import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import {User} from "./User";
import {Rating} from "./Rating";
import { Feedback } from './Feedback';
import { Appointment } from './Appointment';
  @Table
  export class Center extends Model<Center>{
  
    @Column(DataType.STRING)
    name!: string

    @Column(DataType.STRING)
    address!: string

    @HasMany(() => User)
    employees!: User[];

    @HasMany(() => Rating, 'center_id')
    ratings!: Rating[];

    @HasMany(() => Feedback, 'center_id')
    feedbackReceived!: Feedback[];

    @HasMany(() => Appointment, 'center_id')
    appointments!: Appointment[];
};