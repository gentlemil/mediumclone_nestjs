import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '@app/user/user.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import slugify from 'slugify';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';
import { FollowEntity } from '@app/profile/follow.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private dataSource: DataSource,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async findAll(
    currentUserId: number,
    query: any,
  ): Promise<ArticlesResponseInterface> {
    const queryBuilder = this.dataSource
      .getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    // find feeds by tag
    if (query.tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    // find articles by author
    if (query.author) {
      const author = await this.userRepository.findOne({
        where: { username: query.author },
      });
      queryBuilder.andWhere('articles.authorId = :id', {
        id: author.id,
      });
    }

    // find user favourites articles
    if (query.favourited) {
      const author = await this.userRepository.findOne({
        where: { username: query.favourited },
        relations: ['favourites'],
      });

      const ids = author?.favourites.map((article) => article.id) || [];

      if (ids.length > 0) {
        queryBuilder.andWhere('articles.id IN (:...ids)', { ids });
      } else {
        // return empty array
        queryBuilder.andWhere('1=0');
      }
    }

    // display articles from the newest
    queryBuilder.orderBy('articles.createdAt', 'DESC');

    const articlesCount = await queryBuilder.getCount();

    // set how many elements provide per page
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    // set how mamy elements skip (page)
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    // add favourite prop into our article (depends on who is logged)
    let favouriteIds: number[] = [];

    if (currentUserId) {
      const currentUser = await this.userRepository.findOne({
        where: { id: currentUserId },
        relations: ['favourites'],
      });

      favouriteIds = currentUser.favourites.map((favourite) => favourite.id);
    }

    const articles = await queryBuilder.getMany();

    const articlesWithFavourites = articles.map((article) => {
      const favourited = favouriteIds.includes(article.id);

      return { ...article, favourited };
    });

    return { articles: articlesWithFavourites, articlesCount };
  }

  async getFeed(
    currentUserId: number,
    query: any,
  ): Promise<ArticlesResponseInterface> {
    // find all users observed by the logged-in user
    // .find() show all records, but we need to filter them by currentUserId
    // so we user { where: { followerId: currentUserId } }
    const follows = await this.followRepository.find({
      where: {
        followerId: currentUserId,
      },
    });

    // follows = [] means that current user doesn't follow anyone
    if (follows.length === 0) {
      return { articles: [], articlesCount: 0 };
    }

    const followingUserIds: number[] = follows.map(
      (follow: FollowEntity) => follow.followingId,
    );
    console.log(followingUserIds);

    const queryBuilder = this.dataSource
      .getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author')
      .where('articles.authorId IN (:...ids', { ids: followingUserIds });

    // order feeds from the newest
    queryBuilder.orderBy('articles.createdAt', 'DESC');

    // count all articles
    const articlesCount = await queryBuilder.getCount();

    // display specific amount of articles per page
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    // display specific page
    if (query.offset) {
      queryBuilder.limit(query.offset);
    }

    const articles = await queryBuilder.getMany();

    return { articles, articlesCount };
  }

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this._getSlug(createArticleDto.title);
    article.author = currentUser;

    return await this.articleRepository.save(article);
  }

  async findBySlug(slug: string): Promise<ArticleEntity> {
    return this.articleRepository.findOne({ where: { slug } });
  }

  async addArticleToFavourites(
    slug: string,
    userId: number,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favourites'],
    });

    const isNotFavourited =
      user.favourites.findIndex(
        (articleInFavourites) => articleInFavourites.id === article.id,
      ) === -1;

    if (isNotFavourited) {
      user.favourites.push(article);
      article.favoritesCount++;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }

  async deleteArticleFromFavourites(
    slug: string,
    userId: number,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favourites'],
    });

    const articleIndex = user.favourites.findIndex(
      (articleInFavourites) => articleInFavourites.id === article.id,
    );

    if (articleIndex >= 0) {
      user.favourites.splice(articleIndex, 1);
      article.favoritesCount--;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }
    return article;
  }

  async deleteArticle(
    slug: string,
    currentUserId: number,
  ): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException(`You're not an author`, HttpStatus.NOT_FOUND);
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    slug: string,
    updateArticleDto: CreateArticleDto,
    currentUserId: number,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException(`You're not an author`, HttpStatus.NOT_FOUND);
    }

    Object.assign(article, updateArticleDto);

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
