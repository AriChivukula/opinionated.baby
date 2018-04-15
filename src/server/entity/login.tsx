import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Login {

  @Column("text", {unique: true})
  public email: string;

  @PrimaryColumn("text")
  public id: string;
}
