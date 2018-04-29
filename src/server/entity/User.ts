/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/entity/User.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<XmSGsmYuTiyCEz+QL++6ZiQh8hbTSahj/b9nKBvPtFRpuwX604WGQEqqbilL7RXCgjAoGe4fw8zCnX7N2UPZhg==>>
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
