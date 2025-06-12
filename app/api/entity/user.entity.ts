import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Note } from "./note.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isVerify!: boolean;

  @Column()
  verification_token!: string;

  @Column()
  verification_token_expiration!: string;

  @Column()
  reset_token!: string;

  @Column()
  reset_token_expiration!: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[] = [];
}
