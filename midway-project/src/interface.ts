import { UserInfo } from './common/user.info';
/**
 * @description 将当前登录的用户信息保存到context中
 */
declare module '@midwayjs/core' {
  interface Context {
    user: UserInfo;
  }
}
