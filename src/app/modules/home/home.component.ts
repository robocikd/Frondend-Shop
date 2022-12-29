import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { HomePageDto } from './model/homePageDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homePageData!: HomePageDto;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getHomePageData();
  }

  getHomePageData() {
    this.homeService.getHomePageData()
      .subscribe(homePageData => this.homePageData = homePageData);
  }

}
