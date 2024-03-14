import { CommentEntity } from '../comment.entity';

export interface CommentsResponseInterface {
  comments: CommentEntity[];
  commentsCount: number;
}
