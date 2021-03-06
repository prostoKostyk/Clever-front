import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { TokenStorageService } from "../_services/token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }
  /**
   * Метод для добавления токена в запросы
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.token.getToken();
    if (token != null) {
      return next.handle(req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token) }));
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
