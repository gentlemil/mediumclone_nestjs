import { ArticleEntity } from '../article.entity';

// same as ArticleEntity, but without updateTimestamp function
export type ArticleType = Omit<ArticleEntity, 'updateTimestamp'>;
