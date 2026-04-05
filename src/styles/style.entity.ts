import { Academy } from 'src/academies/academy.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Style {
  @PrimaryGeneratedColumn()
  style_id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 1024 })
  description: string;

  @ManyToMany(() => Academy, (academy) => academy.styles)
  academies: Academy[];
}
