import { Comuna } from 'src/comunas/comuna.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Academy {
  @PrimaryGeneratedColumn()
  academy_id: number;

  @ManyToOne(() => Comuna, (comuna) => comuna.academies)
  comuna: Comuna;

  @ManyToOne(() => User, (user) => user.academies)
  user: User;

  @Column({ type: 'varchar', length: 512, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  website_url: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  instagram_url: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  maps_url: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  image: string;
}
