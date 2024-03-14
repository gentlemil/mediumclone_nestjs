import { CommentResponseInterface } from '@app/comment/types/commentResponse.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { ArticleService } from '@app/article/article.service';
import { UserEntity } from '@app/user/user.entity';
import { CommentsResponseInterface } from './types/commentsResponse.interface';

@Injectable()
export class CommentService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly articleService: ArticleService,
  ) {}
  async createComment(
    currentUser: UserEntity,
    slug: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    // find article, throw error if doesn't exist
    const article = await this.articleService.findBySlug(slug);
    if (!article) {
      throw new HttpException(`Article doesn't exist`, HttpStatus.NOT_FOUND);
    }

    // find user, throw error if doesn't exist
    const user = await this.userRepository.findOne({
      where: {
        id: currentUser.id,
      },
    });
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const content = createCommentDto.content;

    if (content.length > 0) {
      const comment = new CommentEntity();
      comment.content = content;
      comment.user = user;
      comment.article = article;

      console.log(comment);

      await this.commentRepository.save(comment);

      return comment;
    }
  }

  async getComments(slug: string): Promise<CommentsResponseInterface> {
    // find article with provided 'slug', throw error if doesn't exist
    const article = await this.articleService.findBySlug(slug);

    if (!article) {
      throw new HttpException(`Article doesn't exist`, HttpStatus.NOT_FOUND);
    }

    // join article and user entities to common entity
    // and then find comments connected to our article
    const queryBuilder = await this.dataSource
      .getRepository(CommentEntity)
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.article', 'article')
      .where('comment.article.id = :articleId', { articleId: article.id });

    const comments = await queryBuilder.getMany();
    const commentsCount = await queryBuilder.getCount();

    return this.buildCommentsResponse(comments, commentsCount);
  }

  buildCommentResponse(comment: CommentEntity): CommentResponseInterface {
    return { comment };
  }

  buildCommentsResponse(
    comments: CommentEntity[],
    commentsCount: number,
  ): CommentsResponseInterface {
    return { comments, commentsCount };
  }
}
