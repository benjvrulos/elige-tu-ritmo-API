import { Comuna } from 'src/comunas/comuna.entity';
import { Style } from 'src/styles/style.entity';
import { Upload } from 'src/uploads/upload.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Academy {
  @PrimaryGeneratedColumn()
  academy_id!: number;

  @ManyToOne(() => Comuna, (comuna) => comuna.academies)
  comuna!: Comuna;

  @ManyToOne(() => User, (user) => user.academies)
  user!: User;

  @Column({ type: 'varchar', length: 512, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  location!: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  website_url?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  instagram_url?: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  maps_url!: string;

  @OneToOne(() => Upload)
  @JoinColumn()
  image!: Upload;

  @ManyToMany(() => Style, (style) => style.academies)
  @JoinTable()
  styles!: Style[];
}
