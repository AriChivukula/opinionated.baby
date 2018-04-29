/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/entity/User.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<xqJxUkJEL4YA4Jbhm5AEWMNzGRRecwobhdjwfUmdYYizuqNIffqxPDVK1CbU6mPpsgzuR+W1YENjxFX4WgpWFw==>>
 */

import { Column, Entity, PrimaryColumn } from "typeorm";

/* BESPOKE START <<DEPRECATE>> */
@Entity()
export class User {

  @Column("text", {unique: true})
  public email: string;

  @PrimaryColumn("text")
  public id: string;
}
/* BESPOKE END <<DEPRECATE>> */
