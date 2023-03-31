import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.page.html',
  styleUrls: ['./portfolio-detail.page.scss'],
})
export class PortfolioDetailPage implements OnInit {
  @ViewChild('chartCanvas')
  private chartCanvas!: ElementRef;
  public chart: any;
  constructor() {}
  

  ngOnInit() {}

  ngAfterViewInit() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      options: {
        plugins: {},
      },
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Crypto',
            fill: false,
            tension: 0.1,
            backgroundColor: 'red',
            borderColor: 'red',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,2,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          },
          {
            label: 'Stock',
            fill: false,
            tension: 0.1,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [35, 39, 6, 51, 58, 45, 35, 8, 5, 56, 51, 12],
            spanGaps: false,
          },
        ],
      },
    });
  }
}
