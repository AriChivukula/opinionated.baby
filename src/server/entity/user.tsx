import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn()
    googleID: string ='';

    @Column({unique: true})
    email: string ='';
}
