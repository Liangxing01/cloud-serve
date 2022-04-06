import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '客户姓名' })
  username: string;

  @Column({ comment: '联系方式', unique: true })
  telphone: string;

  @Column({ comment: '婚期' })
  time: string;

  @Column({ comment: '婚纱集合' })
  clothIds: string;

  @Column({ comment: '婚纱价格' })
  price: number;

  @Column({ comment: '图片编号详情' })
  startTime: string;

  @Column({ comment: '婚纱封面' })
  endTime: string;

  @Column({ comment: '图片备注', nullable: true })
  remarkImgs: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
