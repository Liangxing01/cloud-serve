import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '客户姓名' })
  username: string;

  @Column({ comment: '联系方式', unique: true })
  telphone: string;

  @Column({ comment: '微信名称' })
  wxName: string;

  @Column({ comment: '预约类型' })
  type: number;

  @Column({ comment: '预约时期' })
  time: number;

  @Column({ comment: '预约时间段' })
  date: string;

  @Column({ comment: '预约备注' })
  remark: string;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @Column({ comment: '账号id', nullable: true, default: 0 })
  accountId: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
