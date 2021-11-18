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

  @Column({ comment: '婚纱套系' })
  priceType: number;

  @Column({ comment: '图片详情' })
  imgUrls: string;

  @Column({ comment: '备注' })
  remark: string;

  @Column({ comment: '租借次数' })
  rentNum: number;

  @Column({ comment: '是否被租赁' })
  rentFlag: number;

  @Column({ comment: '账号id' })
  accountId: number;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
