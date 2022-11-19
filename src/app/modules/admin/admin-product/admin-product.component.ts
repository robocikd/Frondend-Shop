import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';
import { AdminProductService } from './admin-product.service';
import { AdminProduct } from './adminProduct';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'price'];
  totalElements: number = 0;
  dataSource: AdminProduct[] = [];

  constructor(private adminProductService: AdminProductService) {}

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.adminProductService.getProducts(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        })
      )
      .subscribe((data) => {
        this.totalElements = data.totalElements;
        this.dataSource = data.content;
      });
  }
}
