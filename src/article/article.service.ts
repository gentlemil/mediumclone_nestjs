import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@app/user/user.entity';
import { Repository } from 'typeorm';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import slugify from 'slugify';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    console.log(currentUser, createArticleDto);
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this._getSlug(createArticleDto.title);
    article.author = currentUser;

    return await this.articleRepository.save(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  private _getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
