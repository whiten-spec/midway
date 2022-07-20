import { Body, Controller, Inject, Post } from "@midwayjs/decorator";
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UserLoginDto } from '../dto/user.dto';
import { UserModel } from '../model/user.model';
import { Validate } from '@midwayjs/validate';
// import { UserModel } from '../model/user.model';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  userModel: UserModel;

  @Post('/login')
  @Validate()
  async login(@Body() loginDto: UserLoginDto) {
    const user = await this.userModel.getUserByUsernameAndPassword(
      loginDto.username,
      loginDto.password
    );
    console.log('user', user);
    return { success: true, message: 'OK', data: user };
  }
}
