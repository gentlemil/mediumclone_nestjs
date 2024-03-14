import { CommentResponseInterface } from '@app/comment/types/commentResponse.interface';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentService } from './comment.service';
import { UserEntity } from '@app/user/user.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Add comment to the article' })
  @Post('articles/:slug/comments/add')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async createComment(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
    @Body('comment') createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.createComment(
      currentUser,
      slug,
      createCommentDto,
    );

    return this.commentService.buildCommentResponse(comment);
  }

  @ApiOperation({ summary: 'Get all comments related to the article' })
  @Get('articles/:slug/comments')
  async getComments(@Param('slug') slug: string) {
    return await this.commentService.getComments(slug);
  }

  @ApiOperation({ summary: 'Delete the comment' })
  @Delete('articles/:slug/comments/:id')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Param('id') commentId: number,
  ): Promise<any> {
    return await this.commentService.deleteComment(
      currentUserId,
      slug,
      commentId,
    );
  }

  // TODO: updateComment (if belongs to user who created)
  // TODO: like or dislike comment?
  // TODO: sort by newest (created) or most popular
}
