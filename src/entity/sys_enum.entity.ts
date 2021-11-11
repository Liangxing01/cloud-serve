import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SysEnum {
  @PrimaryGeneratedColumn({ comment: '枚举value' })
  id: number;

  @Column({ comment: '枚举label' })
  label: string;

  @Column({ comment: '枚举code' })
  enum_code: string;

  @Column({ comment: '枚举value' })
  value: number;
}
