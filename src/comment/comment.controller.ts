import { CommentResponseInterface } from '@app/comment/types/commentResponse.interface';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentService } from './comment.service';
import { UserEntity } from '@app/user/user.entity';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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

  @Get('articles/:slug/comments')
  async getComments(@Param('slug') slug: string) {
    return await this.commentService.getComments(slug);
  }
}
