import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ArticleService } from 'src/modules/articles/article.service';
import { ControllerEnum } from '../../../enums/controllerEnum';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { StatInfoInterface } from 'src/modules/articles/types/statInfo.Interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly articleService: ArticleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const entityId = request.params.id;
    const controller = context.getClass().name;

    const hasRole = roles.some((role) => user.role?.includes(role));
    if (hasRole) {
      return true;
    }

    if (controller === `${ControllerEnum.ARTICLES}Controller`) {
      const [entity] = await this.getAdByPostId(entityId); // перевіряю чи то власник

      return entity && entity.userID === user.id;
    }
    throw new ForbiddenException('You cant do it');
  }

  private async getAdByPostId(
    id: string,
  ): Promise<[ArticleEntity: ArticleEntity, statInfo: StatInfoInterface]> {
    return await this.articleService.getById(id);
  }
}
