import { Body, Controller, Get, Inject, Post, Query } from "@midwayjs/decorator";
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
    if (user && user.length > 0) {
      const jwt = await this.jwtService.sign({ ...user });
      return { success: true, message: '登录成功', data: { token: jwt } };
    }
    return { success: true, message: '账号或密码不正确', data: null };
  }

  /**
   * 退出登录
   * 失效当前用户的jwt token
   * 这里可以使用jwt配合redis ，在验证的时候验证jwt中保存的信息和redis中是否保持一致
   * 使redis中的key失效，可以使退出登录的token不可以进行相关接口操作，本次示例不使用redis，仅验证jwt
   * @param token
   */
  @Get('/logout')
  @Validate()
  async logout(@Query() token: string) {
    // 失效当前用户登录token 失效redis用户token key
    return { success: true, message: '退出登录', data: null };
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
    //测试一下接口验证拦截，不真正删除，实际业务应用中再放开
    // return this.userModel.deleteUser(userId);
    return null;
  }
}
