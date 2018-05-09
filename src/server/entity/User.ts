/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/entities.ts::userEntity>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<EacOA83AsYRQBenEw51EBvtp8nhonnlzgydS0yFleT1k5q8rje/7WSJMbPLuH9ONSR5CBhsa/lycJlqVfM6hYg==>>
 */

import {
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

/* BESPOKE START <<DEPRECATE>> */
@Entity()
export class User {

  @Column("text", {unique: true})
  public email: string;

  @PrimaryColumn("text")
  public id: string;
}
/* BESPOKE END <<DEPRECATE>> */
