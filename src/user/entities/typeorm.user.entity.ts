import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Package } from '../../common/interfaces';

@Entity({ name: 'user' })
export class TypeOrmUserEntity {
  @PrimaryColumn({ type: 'uuid' })
  readonly id: string;

  @Column({ name: 'profile', type: 'text' })
  readonly profile: string;

  @Column({ name: 'full_name', type: 'varchar', length: '50' })
  readonly fullName: string;

  @Column({ name: 'username', type: 'varchar', length: '16', unique: true })
  readonly username: string;

  @Column({ name: 'password', type: 'text' })
  readonly password: string;

  @Column({ name: 'package', type: 'enum', enum: Package, default: Package.STANDARD })
  readonly package: Package;

  @Column({ name: 'created_at', type: 'timestamptz' })
  readonly createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamptz' })
  readonly updatedAt: Date;
}
