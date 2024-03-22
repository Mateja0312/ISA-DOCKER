import { Table, Column, Model, HasMany, ForeignKey, HasOne, DataType } from 'sequelize-typescript';
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
  @Column(DataType.STRING)
  firstName!: string

  @Column(DataType.STRING)
  lastName!: string

  @Column(DataType.STRING)
  email!: string

  @Column(DataType.STRING)
  password!: string

  @Column(DataType.ENUM(...Object.values(Roles)))
  role!: Roles

  @Column(DataType.STRING)
  active!: string

  @Column(DataType.STRING)
  address!: string

  @Column(DataType.STRING)
  city!: string

  @Column(DataType.STRING)
  country!: string

  @Column(DataType.STRING)
  phone!: string

  @Column(DataType.STRING)
  JMBG!: string

  @Column(DataType.STRING)
  profession!: string

  @Column(DataType.ENUM(...Object.values(Gender)))
  gender!: Gender

  @Column(DataType.STRING)
  institution!: string

  @ForeignKey(() => Center)
  @Column(DataType.NUMBER)
  employedAt!: number

  @HasMany(() => Rating)
  ratings!: Rating[];

  @HasMany(() => Appointment, 'employee_id')
  appointmentsAsEmployee!: Appointment[];

  @HasMany(() => Appointment, 'client_id')
  appointmentsAsClient!: Appointment[];

  @HasOne(() => Questionnaire, 'client_id')
  myQuestionnaire!: Questionnaire;

  @HasMany(() => Feedback, 'client_id')
  feedbacksGiven!: Feedback[];

  @HasMany(() => Feedback, 'employee_id')
  feedbacksReceived!: Feedback[];
}