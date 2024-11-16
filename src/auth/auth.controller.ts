import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }


  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).
      pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    
    return this.client.send('auth.register.user', registerUserDto).
      pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@Token() token: string ) {
    
    // const user = req['user'];
    // const token = req['token'];

    return this.client.send('auth.verify.user', token).
      pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }
}
