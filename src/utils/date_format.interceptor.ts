// date-format.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.formatDates(data)));
  }

  private formatDates(data: any) {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      const hours = String(date.getUTCHours() - 3).padStart(2, '0'); // Ajusta para UTC-3
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const formatItem = (item: any) => {
      return {
        ...item,
        criadoEm: formatDate(item.criadoEm),
        atualizadoEm: formatDate(item.atualizadoEm),
      };
    };

    if (Array.isArray(data)) {
      return data.map(formatItem);
    } else if (data && typeof data === 'object') {
      return formatItem(data);
    }

    return data; // Retorna o dado original se não for um objeto ou array
  }
}
