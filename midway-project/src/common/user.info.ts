/**
 * 保存记录当前登录的用户信息
 */
export class UserInfo {
  id: number;
  username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}
