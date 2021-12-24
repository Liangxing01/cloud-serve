import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cloth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '婚纱名称', unique: true })
  name: string;

  @Column({ comment: '婚纱编码' })
  code: string;

  @Column({ comment: '婚纱类型' })
  type: number;

  @Column({ comment: '婚纱价格' })
  price: string;

  @Column({ comment: '婚纱封面' })
  imgCover: string;

  @Column({ comment: '图片详情' })
  imgUrls: string;

  @Column({ comment: '备注' })
  remark: string;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
