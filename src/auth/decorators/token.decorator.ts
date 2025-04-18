
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {

        const request = ctx.switchToHttp().getRequest();
        
        if( !request.token ){
            throw new InternalServerErrorException("No se encotro el Token en la Request (AuthGuard)")
        }

        return request.token;
    },
);
