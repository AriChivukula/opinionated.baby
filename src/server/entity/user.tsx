import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    @Unique()
    googleID: string ='';

    @Column()
    @Unique()
    email: string ='';
}
