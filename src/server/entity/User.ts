/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/entities.ts::userEntity>>
 * BESPOKE<<User>>
 * SIGNED<<uK9H/1PYv7vFEkOP+G9BqKjW72/bSiYO810yCVEf7Zw5nr+p4w8VsGqx++4Vhq/RyNQDSOaNOl7CGAVJTKIO2w==>>
 */

import {
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

/* BESPOKE START <<User>> */
@Entity()
export class User {

  @Column("text", {unique: true})
  public email: string;

  @PrimaryColumn("text")
  public id: string;
}
/* BESPOKE END <<User>> */
