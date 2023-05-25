import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.page.html',
  styleUrls: ['./asset-detail.page.scss','../folder/folder.page.scss'],
})
export class AssetDetailPage implements OnInit {
  @ViewChild('chartCanvas')
  private chartCanvas!: ElementRef;
  public assetDate!: string;
  public assetValue!: string;
  public chart: any;
  public portfolios = [
    { title: 'Portfolio one', icon: '../../assets/icon/icon.png', value: '$123.4K', gain: '+$1.5k (+1.8%)' },
    { title: 'Portfolio two', icon: '../../assets/icon/icon.png', value: '$13.4K', gain: '+$1.1k (+1.8%)' },
    { title: 'Stocks', icon: '../../assets/icon/icon.png', value: '$3.4K', gain: '+$1.1k (+1.8%)' },
    { title: 'Crypto', icon: '../../assets/icon/icon.png', value: '$88.4K', gain: '+$1.1k (+1.8%)' },

  ];
  constructor() {}
  

  ngOnInit() {}

  ngAfterViewInit() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      options: {
        onHover: (event: any, activeElements: any) => {
          if (activeElements && activeElements.length) {
            const index = activeElements[0].index;
            this.assetDate = this.chart.data.labels[index];
            this.assetValue = "$ " +this.chart.data.datasets[0].data[index];
            
          }
        },
        scales: {
          y: {
            ticks: {
              display: true
            }
          },
          x: {
            ticks: {
              display: false
            }
          }
        },
        plugins: {},
      },
      
      data: {
        labels: [
          '11.1.2020 2:00',
          '11.1.2020 3:00',
          '11.1.2020 4:00',
          '11.1.2020 5:00',
          '11.1.2020 6:00',
          '11.1.2020 7:00',
          '11.1.2020 8:00',
          '11.1.2020 9:00',
          '11.1.2020 10:00',
          '11.1.2020 11:00',
          '11.1.2020 12:00',
        ],
        datasets: [
          {
            label: 'Crypto',
            fill: true,
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
        ],
      },
    });

    const lengthIndex = this.chart.data.labels.length-1;
    this.assetDate = this.chart.data.labels[lengthIndex];
    this.assetValue = "$ " +this.chart.data.datasets[0].data[lengthIndex];
  }
}
