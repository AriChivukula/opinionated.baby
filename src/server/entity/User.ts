/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server/entity/User.ts::module>>
 * BESPOKE<<DEPRECATE>>
 * SIGNED<<Ttj0lvoumIqh+GdRomCpef9u3zpQv7Ouxi0OcJfIKqOo/Q3cZ6Xs04sjPWL+50s0WfG4PzffVfz6AQUyLpaK8g==>>
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
