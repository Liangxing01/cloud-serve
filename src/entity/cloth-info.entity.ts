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

  @Column({ comment: '婚纱编码', unique: true })
  code: string;

  @Column({ comment: '婚纱可租数量' })
  num: number;

  @Column({ comment: '婚纱库存数量', nullable: true })
  totalNum: number;

  @Column({ comment: '婚纱类型' })
  type: number;

  @Column({ comment: '图片编号详情' })
  imgCode: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '删除标识', default: 1 })
  deleteFlag: number;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateData: Timestamp;
}
