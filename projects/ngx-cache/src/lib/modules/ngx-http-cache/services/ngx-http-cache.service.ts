import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INgxHttpCacheEntry } from '../models/ngx-http-cache.model';

@Injectable({ providedIn: 'root' })
export class NgxHttpCacheService {

  // store cache
  _cacheMap = new Map<string, INgxHttpCacheEntry>();

  constructor() {
  }

  // get cache
  get(req: HttpRequest<any>, cacheAge: number): HttpResponse<any> | null {
    // delete if expired
    if (cacheAge > 0) {
      this.deleteExpiredCache(cacheAge);
    }
    const entry = this._cacheMap.get(req.urlWithParams);
    if (!entry) {
      return null;
    }
    return entry.response;
  }

  // set cache
  set(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const entry: INgxHttpCacheEntry = { url: req.urlWithParams, response: res, entryTime: Date.now() };
    this._cacheMap.set(req.urlWithParams, entry);
  }

  // remove specific cache
  remove(url: string): boolean {
    if (this._cacheMap.has(url)) {
      this._cacheMap.delete(url);
    }
    return false;
  }

  // clear all cache
  clear() {
    this._cacheMap.clear();
  }

  // delete the cache
  private deleteExpiredCache(cacheAge: number) {
    this._cacheMap.forEach(entry => {
      if (this.isCacheExpired(entry.entryTime, cacheAge)) {
        this._cacheMap.delete(entry.url);
      }
    })
  }

  // check wheter cache is expired or not
  private isCacheExpired(entryTime: number, cacheAge: number): boolean {
    return (Date.now() - entryTime) > cacheAge;
  }
}
