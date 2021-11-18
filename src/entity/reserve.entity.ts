import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ReserveInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '客户姓名', unique: true })
  username: string;

  @Column({ comment: '联系方式' })
  telphone: string;

  @Column({ comment: '服装id集合' })
  cIds: string;

  @Column({ comment: '预约时间' })
  time: string;

  @Column({ comment: '预约备注' })
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
