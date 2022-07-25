import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username,
    password
  ): Promise<UserEntity[]> {
    // const user = new UserEntity();
    // user.username = username;
    // user.password = password;
    // this.userRepo.save(user);
    return this.userRepo.find({
      where: {
        username: username,
        password: password,
      },
    });
  }

  /**
   * 根据用户名和密码获取新增用户
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async addUser(username, password): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = username;
    user.password = password;
    return this.userRepo.save(user);
  }

  async deleteUser(userId) {
    return this.userRepo.delete(userId);
  }
}
