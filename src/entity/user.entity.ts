import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ comment: '客户姓名', unique: true })
  name: string;

  @Column({ comment: '客户备注' })
  remark: string;

  @Column({ comment: '联系方式' })
  telphone: string;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
