import { Config, Inject, Middleware } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
/**
 * jwt token认证中间件
 */
@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;
  @Config('app.jwt')
  jwtConfig;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError('缺少凭证');
      }
      const parts = ctx.get('authorization').trim().split(' ');
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError('无效的凭证');
      }
      const [scheme, token] = parts;
      if (!/^Bearer$/i.test(scheme)) {
        throw new httpError.UnauthorizedError('缺少Bearer');
      }
      // 验证token，过期会抛出异常
      const jwt = await this.jwtService.verify(token, { complete: true });
      // jwt中存储的user信息
      const payload = jwt['payload'];
      //获取调用接口的用户信息
      ctx.user = payload[0];
      console.log('payload', payload);
      return next();
    };
  }

  public match(ctx: Context): boolean {
    const { path } = ctx;
    const { prefix, ignore } = this.jwtConfig;
    const exist = ignore.find(item => {
      return item.match(path);
    });
    return path.indexOf(prefix) === 0 && !exist;
  }

  public static getName(): string {
    return 'JWT';
  }
}
