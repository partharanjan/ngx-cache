import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxHttpCacheInterceptor } from './services/ngx-cache-http-interceptor';
import { INgxHttpCacheConfig } from './models/ngx-http-cache.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NgxHttpCacheModule {

  static forRoot(cacheConfig: INgxHttpCacheConfig): ModuleWithProviders<NgxHttpCacheModule> {
    return {
      ngModule: NgxHttpCacheModule,
      providers: [
        {
          provide: 'HTTP_CACHE_CONFIG', useValue: cacheConfig
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NgxHttpCacheInterceptor,
          multi: true
        }
      ]
    }
  }

}
