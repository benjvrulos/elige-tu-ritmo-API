import { Comuna } from 'src/comunas/comuna.entity';
import { Upload } from 'src/uploads/upload.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlaceType } from './enums/place-type.enum';
import { ExperiencePlace } from 'src/experiences/entities/experience-place.entity';

@Entity('place')
export class Place {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  comunaId?: number;

  @ManyToOne(() => Comuna, (comuna) => comuna.places, {
    nullable: true,
  })
  @JoinColumn({ name: 'comunaId' })
  comuna?: Comuna;

  @Column({ nullable: true })
  imageId?: number;

  @ManyToOne(() => Upload, (upload) => upload.places, {
    nullable: true,
  })
  @JoinColumn({ name: 'imageId' })
  image?: Upload;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 180, unique: true })
  slug!: string;

  @Column({ length: 300, nullable: true })
  shortDescription?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: PlaceType,
    default: PlaceType.OTHER,
  })
  type!: PlaceType;

  @Column({ length: 255, nullable: true })
  address?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  latitude?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  longitude?: number;

  @Column({ length: 1024, nullable: true })
  mapsUrl?: string;

  @Column({ length: 1024, nullable: true })
  websiteUrl?: string;

  @Column({ length: 1024, nullable: true })
  instagramUrl?: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => ExperiencePlace, (experiencePlace) => experiencePlace.place)
  experiences!: ExperiencePlace[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
