import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ControllerEnum } from '../../../enums/controllerEnum';
import { ArticleService } from '../article.service';
import { ArticleNewEntity } from '../../../database/entities/articleNew.entity';
import { StatInfoInterface } from '../types/statInfo.Interface';

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
    if (!user) {
      throw new BadRequestException('You must login');
    }
    const entityId = request.params.id;
    const controller = context.getClass().name;

    const hasRole = roles.some((role) => user.role?.includes(role));
    if (hasRole) {
      return true;
    }

    if (controller === `${ControllerEnum.ARTICLES}Controller` && entityId) {
      const [entity] = await this.getAdByPostId(entityId); // перевіряю чи то власник

      return entity && entity.userID === user.id;
    }
    throw new ForbiddenException('You cant do it');
  }

  private async getAdByPostId(
    id: string,
  ): Promise<[ArticleEntity: ArticleNewEntity, statInfo: StatInfoInterface]> {
    return await this.articleService.getById(id);
  }
}
