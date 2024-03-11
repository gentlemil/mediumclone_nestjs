import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@app/user/user.entity';
import { Repository } from 'typeorm';

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

    article.slug = 'fooo';
    article.author = currentUser;

    return await this.articleRepository.save(article);
  }
}
