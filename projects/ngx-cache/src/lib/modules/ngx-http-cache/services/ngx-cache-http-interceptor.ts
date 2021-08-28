import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { of } from "rxjs";
import { tap } from 'rxjs/operators';
import { INgxHttpCacheConfig } from "../models/ngx-http-cache.model";
import { NgxHttpCacheService } from "./ngx-http-cache.service";

@Injectable()
export class NgxHttpCacheInterceptor implements HttpInterceptor {

    constructor(@Inject('HTTP_CACHE_CONFIG') private config: INgxHttpCacheConfig,
        private cache: NgxHttpCacheService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRequestCachable(req)) {
            return next.handle(req);
        }
        const cachedResponse = this.cache.get(req, this.config.cacheAge);
        if (cachedResponse !== null) {
            return of(cachedResponse);
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(req, event);
                }
            })
        );
    }

    // check whether reqeust is cacheble or not
    private isRequestCachable(req: HttpRequest<any>) {
        if (this.config.cacheHttpMethods && this.config.cacheUrls
            && this.config.cacheHttpMethods.length > 0 && this.config.cacheUrls.length > 0) {
            // check method allows
            if (this.config.cacheHttpMethods.indexOf(req.method) > -1) {
                const total = this.config.cacheUrls.length;
                for (let i = 0; i < total; i++) {
                    const path = this.config.cacheUrls[i];
                    if (path && req.url.toLocaleLowerCase().includes(path.toLocaleLowerCase())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}