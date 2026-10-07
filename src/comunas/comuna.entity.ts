import { Academy } from 'src/academies/academy.entity';
import { Place } from 'src/places/place.entity';
import { Region } from 'src/regions/region.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comuna')
export class Comuna {
  @PrimaryGeneratedColumn()
  comuna_id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Region, (region) => region.comunas, { nullable: false })
  @JoinColumn({ name: 'region_id' })
  region!: Region;

  @OneToMany(() => Academy, (academy) => academy.comuna)
  academies!: Academy[];

  @OneToMany(() => Place, (place) => place.comuna)
  places!: Place[];
}
