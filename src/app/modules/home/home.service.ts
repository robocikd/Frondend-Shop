import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomePageDto } from './model/homePageDto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public getHomePageData(): Observable<HomePageDto> {
    return this.http.get<HomePageDto>('/api/homePage');
  }

}
