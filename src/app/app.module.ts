import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxHttpCacheModule } from 'projects/ngx-cache/src/lib/modules/ngx-http-cache/ngx-http-cache.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxHttpCacheModule.forRoot({
      cacheAge: 10000,
      cacheHttpMethods: ['GET'],
      cacheUrls: ['api/json']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
