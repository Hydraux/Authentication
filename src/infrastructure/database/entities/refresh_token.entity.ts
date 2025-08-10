import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('refresh_tokens')
@Index(['userId']) // Index for faster user lookups
@Index(['tokenHash'], { unique: true }) // Unique index for token hash
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'token_hash' })
  tokenHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'expires_at' })
  expiresAt: Date;
}
