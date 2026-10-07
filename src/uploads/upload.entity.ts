import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { fileTypes } from './enums/file-types.enum';
import { Academy } from 'src/academies/academy.entity';
import { Place } from 'src/places/place.entity';
import { Experience } from 'src/experiences/entities/experience.entity';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  path!: string;

  @Column({
    type: 'enum',
    enum: fileTypes,
    default: fileTypes.IMAGE,
    nullable: false,
  })
  type!: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  mime!: string;

  @Column({ type: 'int', nullable: false })
  size!: number;

  @Column({ length: 255, nullable: true })
  altText?: string;

  @OneToMany(() => Academy, (academy) => academy.image)
  academies!: Academy[];

  @OneToMany(() => Place, (place) => place.image)
  places!: Place[];

  @OneToMany(() => Experience, (experience) => experience.coverImage)
  experiences!: Experience[];

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
