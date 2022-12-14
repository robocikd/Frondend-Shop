import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-statistics',
  templateUrl: './admin-order-statistics.component.html',
  styleUrls: ['./admin-order-statistics.component.scss']
})
export class AdminOrderStatisticsComponent implements OnInit, AfterViewInit {

  @ViewChild("statistics") private statistics!: ElementRef;
  chart!: Chart;
  ordersNo: number = 0;
  salesSum: number = 0;
  private data = {
    labels: [1, 2, 3, 4],
    datasets: [
      {
        label: 'Zamówienia',
        data: [],
        borderColor: '#FF3F7C',
        backgroundColor: '#FF7A9F',
        order: 1,
        yAxisID: 'y'
      },
      {
        label: 'Sprzedaż',
        data: [],
        borderColor: '#0088FF',
        backgroundColor: '#00A1FF ',
        type: 'line',
        order: 0,
        yAxisID: 'y1'
      }
    ]
  } as ChartData;


  constructor(private adminOrderService: AdminOrderService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupChart();
    this.getSalesStatistics();
  }
  getSalesStatistics() {
    this.adminOrderService.getSalesStatistics()
      .subscribe(statistics => {
        this.data.labels = statistics.labels;
        this.data.datasets[0].data = statistics.orders;
        this.data.datasets[1].data = statistics.sales;
        this.chart.update();
        this.ordersNo = statistics.orders.reduce((acc: number, value: number) => acc + value);
        this.salesSum = statistics.sales.reduce((acc: number, value: number) => acc + value);
      });
  }
  setupChart() {
    this.chart = new Chart(this.statistics.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Wykres sprzedaży'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }
        }
      }
    });
  }
}