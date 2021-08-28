# NgxCache
Cache angular HTTP Request
## Setup
### NPM
To setup this package on you project, just call the following command.
```
npm i ngx-cache
```
### Simple Setup
On your Angular Project, you shall include the `NgxHttpCacheModule` on your AppModule
```ts
import { NgxHttpCacheModule } from 'ngx-cache';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxHttpCacheModule.forRoot({
      cacheAge: 0,
      cacheHttpMethods: ['GET'],
      cacheUrls: ['api/json']
    })
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Cache Config
### CacheAge
`cacheAge` required for how many miliseconds reqeust will be cache.
set `cacheAge:0` for no limit
### cacheHttpMethods
`cacheHttpMethods` required for which http methods need to be cache like `GET`, `POST` etc.
Make sure `cacheHttpMethods` should be CAPITAL
### cacheUrls
`cacheUrls` required for which urls need to cached.
Ex. Suppose your URL is https://www.domain.com/user/details/123
If you want to cache all the url likes `user/details/123`,`user/details/456`  etc
Simply add `cacheUrls: ['user/details']`, then it will autometically cache all the URL after that
`cacheUrls` also support query string cache like `user/details/123?page=1&perPage=10`

