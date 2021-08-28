import { HttpResponse } from '@angular/common/http';
export interface INgxHttpCacheEntry {
    url: string;
    response: HttpResponse<any>
    entryTime: number;
}

export interface INgxHttpCacheConfig {
    cacheHttpMethods: string[];
    cacheUrls: string[];
    cacheAge:number
}