import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cloth } from './cloth-info.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '客户id' })
  userId: number;

  // @OneToOne(() => Cloth)
  // @JoinColumn()
  // cloth: Cloth;
  @Column()
  clothId: number;

  @Column({ comment: '婚纱租赁开始时间' })
  startTime: string;

  @Column({ comment: '婚纱租赁结束时间' })
  endTime: string;

  @Column({ comment: '档期备注' })
  remark: string;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @Column({ comment: '账号id' })
  accountId: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
