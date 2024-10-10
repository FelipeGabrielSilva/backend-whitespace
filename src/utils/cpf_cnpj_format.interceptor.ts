// format-user.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatCNPJ, formatCNPJ_CPF, formatCPF } from './cpf_cnpj_format';

@Injectable()
export class FormatCpfCnpjInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
        if (request.body.cpf) {
        request.body.cpf = formatCPF(request.body.cpf);
      }
      
      if (request.body.cnpj) {
        request.body.cnpj = formatCNPJ(request.body.cnpj);
      }
      
      if (request.body.cnpjCpf) {
        request.body.cnpjCpf = formatCNPJ_CPF(request.body.cnpjCpf);
      }
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
