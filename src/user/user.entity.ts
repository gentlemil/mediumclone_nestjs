import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '@app/article/article.entity';
import { CommentEntity } from '@app/comment/comment.entity';
import FileEntity from '@app/file/file.entity';

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

  /**
   * { select: false } means that when I send request for userEntity,
   * password is not selected by default uless u say it explicity
   */
  @Column({ select: false })
  password: string;

  /* file */
  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => FileEntity, {
    nullable: true,
  })
  public avatar?: FileEntity;

  @Column({ nullable: true })
  public avatarId?: number;

  /* hash password before send request */
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
