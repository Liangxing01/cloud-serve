import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '客户名声' })
  username: string;

  @Column({ comment: '客户联系方式' })
  telphone: string;

  @Column()
  clothId: number;

  @Column({ comment: '婚纱档期时间' })
  time: string;

  @Column({ comment: '婚纱租赁开始时间' })
  startTime: string;

  @Column({ comment: '婚纱租赁结束时间' })
  endTime: string;

  @Column({ comment: '档期备注', nullable: true })
  remark: string;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @Column({ comment: '账号id', nullable: true })
  accountId: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
