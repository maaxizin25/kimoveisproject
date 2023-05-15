import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_state.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @OneToMany(() => RealEstate, (real) => real.category)
  realEstate: RealEstate[];
}
