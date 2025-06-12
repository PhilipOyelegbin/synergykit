import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column()
  content: string | undefined;

  @ManyToOne(() => User, (user) => user.notes)
  user: User[] = [];
}
