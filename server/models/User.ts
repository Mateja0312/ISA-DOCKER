import { Table, Column, Model, HasMany, ForeignKey, HasOne } from 'sequelize-typescript';
import { Appointment } from './Appointment';
import { Center } from "./Center";
import { Rating } from "./Rating";
import { Questionnaire } from "./Questionnaire";
import { Feedback } from './Feedback';

export enum Roles {
  SYS_ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CLIENT = 'client',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

@Table
export class User extends Model<User>{
  @Column
  firstName!: string

  @Column
  lastName!: string

  @Column
  email!: string

  @Column
  password!: string

  @Column
  role!: Roles

  @Column
  active!: string

  @Column
  address: string

  @Column
  city: string

  @Column
  country: string

  @Column
  phone: string

  @Column
  JMBG: string

  @Column
  profession: string

  @Column
  gender: Gender

  @Column
  institution: string

  @ForeignKey(() => Center)
  @Column
  employedAt: number

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => Appointment, 'employee_id')
  appointmentsAsEmployee: Appointment[];

  @HasMany(() => Appointment, 'client_id')
  appointmentsAsClient: Appointment[];

  @HasOne(() => Questionnaire, 'client_id')
  myQuestionnaire: Questionnaire;

  @HasMany(() => Feedback, 'client_id')
  feedbacksGiven: Feedback[];

  @HasMany(() => Feedback, 'employee_id')
  feedbacksReceived: Feedback[];
}