
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {

        const request = ctx.switchToHttp().getRequest();
        
        if( !request.user ){
            throw new InternalServerErrorException("No se encotro el Usuario en la Request (AuthGuard)")
        }

        return request.user;
    },
);
