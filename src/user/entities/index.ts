import { TypeOrmDatingHistoryEntity } from './typeorm.dating-history.entity';
import { TypeOrmUserEntity } from './typeorm.user.entity';

export * from './typeorm.dating-history.entity';
export * from './typeorm.user.entity';

export const TypeOrmUserEntities = [TypeOrmUserEntity, TypeOrmDatingHistoryEntity];
