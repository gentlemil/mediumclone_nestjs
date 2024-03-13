import { CommentResponseInterface } from '@app/comment/types/commentResponse.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { ArticleService } from '@app/article/article.service';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly articleService: ArticleService,
  ) {}
  async createComment(
    currentUserId: number,
    slug: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    console.log(currentUserId, slug, createCommentDto);
    // find article, throw error if doesn't exist
    const article = await this.articleService.findBySlug(slug);
    if (!article) {
      throw new HttpException(`Article doesn't exist`, HttpStatus.NOT_FOUND);
    }

    // find user, throw error if doesn't exist
    const user = await this.userRepository.findOne({
      where: {
        id: currentUserId,
      },
    });
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }
    const comment = createCommentDto.description;

    if (comment.length > 0) {
      const commentToCreate = new CommentEntity();
      commentToCreate.authorId = user.id;
      commentToCreate.slug = slug;
      commentToCreate.description = comment;

      await this.commentRepository.save(commentToCreate);

      return commentToCreate;
    }
  }

  buildCommentResponse(comment: CommentEntity): CommentResponseInterface {
    return { comment };
  }
}
