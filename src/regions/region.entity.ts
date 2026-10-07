import { Comuna } from 'src/comunas/comuna.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region')
export class Region {
  @PrimaryGeneratedColumn()
  region_id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Comuna, (comuna) => comuna.region)
  comunas!: Comuna[];
}
