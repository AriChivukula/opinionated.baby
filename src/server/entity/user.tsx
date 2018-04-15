import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {

  @Column("text", {unique: true})
  public email: string;

  @PrimaryColumn("text")
  public googleID: string;
}
