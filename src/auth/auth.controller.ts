import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';

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


}
