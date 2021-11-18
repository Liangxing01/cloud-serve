import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  rId: number;

  @Column({ comment: '角色名称', unique: true })
  name: string;

  @Column({ comment: '角色代码', unique: true })
  code: string;

  @Column({ comment: '用户id' })
  uId: string;
}
