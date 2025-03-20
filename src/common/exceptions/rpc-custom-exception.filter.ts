import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {

    catch(exception: RpcException, host: ArgumentsHost) {
    
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if(
            typeof rpcError === 'object' &&
            'status' in rpcError && 
            typeof rpcError.status === 'number' &&
            'message' in rpcError 
        ){
            const status = rpcError.status;
            return response.status(status).json({
                message: rpcError.message
            });
        }




        response.status(500).json({
            ...rpcError as object,
            status: 500
        })
    }


}