import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Package } from '../../common/interfaces';

@Entity({ name: 'user_package' })
export class TypeOrmUserPackageEntity {
  @PrimaryColumn({ type: 'uuid' })
  readonly id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  readonly userId: string;

  @Column({ name: 'package', type: 'enum', enum: Package, default: Package.STANDARD })
  readonly package: Package;

  @Column({ name: 'created_at', type: 'timestamptz' })
  readonly createdAt: Date;
}
