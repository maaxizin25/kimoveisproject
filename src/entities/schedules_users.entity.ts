import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_state.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => RealEstate, (real) => real.schedules)
  realEstate: RealEstate;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
}
