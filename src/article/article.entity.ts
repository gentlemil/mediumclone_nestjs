import { CommentEntity } from '@app/comment/comment.entity';
import { UserEntity } from '@app/user/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  body: string;

  @Column('simple-array')
  tagList: string[];
  tags: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt;

  @Column({ default: 0 })
  favoritesCount: number;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  // many articles belongs to one user
  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;

  // comments: CommentEntity[];
  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];
}
