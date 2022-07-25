import { Body, Controller, Inject, Post, Query } from "@midwayjs/decorator";
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UserLoginDto } from '../dto/user.dto';
import { UserModel } from '../model/user.model';
import { Validate } from '@midwayjs/validate';
import { JwtService } from '@midwayjs/jwt';
// import { UserModel } from '../model/user.model';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwtService: JwtService;

  @Post('/login')
  @Validate()
  async login(@Body() loginDto: UserLoginDto) {
    const user = await this.userModel.getUserByUsernameAndPassword(
      loginDto.username,
      loginDto.password
    );
    console.log('user', user);
    const jwt = await this.jwtService.sign({ ...user });
    console.log('token', jwt);
    return { success: true, message: 'OK', data: { token: jwt } };
  }

  /**
   * 注册增加新用户
   * @param loginDto
   */
  @Post('/register')
  @Validate()
  async register(@Body() loginDto: UserLoginDto) {
    const user = await this.userModel.addUser(
      loginDto.username,
      loginDto.password
    );
    console.log('user', user);
    return { success: true, message: 'OK', data: user };
  }

  /**
   * 删除用户
   * @param loginDto
   */
  @Post('/delete')
  @Validate()
  async delete(@Query('userId') userId: number) {
    // return this.userModel.deleteUser(userId);
    return null;
  }
}
