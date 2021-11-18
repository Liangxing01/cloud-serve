import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column({ comment: '账号', unique: true })
  account: string;

  @Column({ comment: '密码' })
  password: string;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
