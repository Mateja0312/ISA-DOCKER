'use strict';

import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Center } from './Center';
import { User } from "./User";

export enum AppointmentStatus {
  PREDEFINED = 'predefined',
  CLIENT_ACCEPTED = 'accepted',
  CLIENT_RESERVED = 'reserved',
  CLIENT_CANCELED = 'canceled',
  FAILED = 'failed',
  COMPLETED = 'completed',
}
  @Table
  export class Appointment extends Model<Appointment>{

    @Column
    start: Date;

    @Column
    end: Date;

    @Column
    status: AppointmentStatus;

    @BelongsTo(() => User, 'employee_id')
    employee: User;

    @BelongsTo(() => User, 'client_id')
    client: User;

    @ForeignKey(() => User)
    @Column
    client_id: number

    @BelongsTo(() => Center, 'center_id')
    center: Center;

    @ForeignKey(() => Center)
    @Column
    center_id: number
  }
  