import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '@app/article/article.entity';
import { CommentEntity } from '@app/comment/comment.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  /**
   * { select: false } means that when I send request for userEntity,
   * password is not selected by default uless u say it explicity
   */
  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  // user has created many articles
  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favourites: ArticleEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
