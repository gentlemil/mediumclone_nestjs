import { ArticleEntity } from '@app/article/article.entity';
import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;
}
