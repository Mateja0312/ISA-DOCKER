'use strict';

import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import {User} from "./User";

export const questions : Array<string> = [
  "Da li ste do sada dobrovoljno davali krv ili komponente krvi?",
  "Da li ste ikada bili odbijeni kao davalac krvi ili komponente krvi?",
  "Da li se trenutno osećate zdravim, sposobnim i odmornim da date krv ili komponente krvi?",
  "Da li ste nešto jeli pre dolaska na davanje krvi ili komponente krvi?",
  "Da li se bavite opasnim zanimanjem ili hobijem?",
  "Da li redovno (svakodnevno) uzimate bilo kakve lekove?",
  "Da li ste poslednja 2-3 dana uzimali bilo kakve lekove (npr. Brufen, Kafetin, Analgin..,.)?",
  "Da li ste uzimali Aspirin (Cardiopirin) u poslednjih 5 dana?",
  "Da li ste do sada ispitivani ili lečeni u bolnici ili ste trenutno na ispitivanju ili bolovanju?",
  "Da li ste vadili zub u proteklih 7 dana?",
  "Da li ste u poslednjih 7 do 10 dana imali temperaturu preko 38 C, kijavicu, prehladu ili uzimali antibiotike?",
  "Da li ste primili bilo koju vakcinu ili serum u proteklih 12 meseci?",
  "Da li ste u poslednjih 6 meseci naglo izgubili na težini?",
  "Da li ste imali ubode krpelja u proteklih 12 meseci i da li ste se zbog toga javljali lekaru?",
  "Da li ste ikada lečeni od epilepsije (padavice), šećerne bolesti, astme, tuberkuloze, infarkta, moždanog udara, malignih oboljenja, mentalnih bolesti ili malarije?"
];

  @Table
  export class Questionnaire extends Model<Questionnaire>{
  
    @Column
    q_answers: string;

    @ForeignKey(() => User)
    @Column
    client_id: number

    @BelongsTo(() => User, 'client_id')
    client: User;
    
    public get parsedAnswers() : string {
      return JSON.parse(this.q_answers);
    }

    public set setQAnswers(qAnswers : Array<string>) {
      
      this.q_answers = JSON.stringify(qAnswers);
    }
};