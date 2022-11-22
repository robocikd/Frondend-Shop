import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { map, startWith, switchMap } from 'rxjs';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { AdminProductService } from './admin-product.service';
import { AdminProduct } from './adminProduct';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  totalElements: number = 0;
  dataSource: AdminProduct[] = [];

  constructor(
    private adminProductService: AdminProductService,
    private adminConfirmDialogService: AdminConfirmDialogService
  ) {}

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

  confirmDelete(element: AdminProduct) {
    this.adminConfirmDialogService
      .openConfirmDialog("Czy na pewno chcesz usunąć ten produkt?")
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.adminProductService.delete(element.id).subscribe(() => {
            this.dataSource.forEach((value, index) => {
              if (element == value) {
                this.dataSource.splice(index, 1);
                this.table.renderRows();
              }
            });
          });
        }
      });
  }
}
