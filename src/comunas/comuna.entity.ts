import { Academy } from 'src/academies/academy.entity';
import { Region } from 'src/regions/region.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comuna {
  @PrimaryGeneratedColumn()
  comuna_id: number;

  @Column()
  name: string;

  @ManyToOne(() => Region, (region) => region.comuna)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @OneToMany(() => Academy, (academy) => academy.comuna)
  academies: Academy[];
}
