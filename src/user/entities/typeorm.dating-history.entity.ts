import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DatingHistoryType } from '../user.constant';

@Entity({ name: 'dating_history' })
export class TypeOrmDatingHistoryEntity {
  @PrimaryColumn({ type: 'uuid' })
  readonly id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  readonly userId: string;

  @Column({ name: 'partner_id', type: 'uuid' })
  readonly partnerId: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: DatingHistoryType,
    default: DatingHistoryType.LIKE,
  })
  readonly type: DatingHistoryType;

  @Column({ name: 'created_at', type: 'timestamptz' })
  readonly createdAt: Date;
}
