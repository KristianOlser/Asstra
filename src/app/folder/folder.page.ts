import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public chart: any;
  public chartData!: number[];
  public portfolios = [
    { title: 'Portfolio one', url: '/portfolio-detail', icon: '../../assets/icon/icon.png', value: '$123.4K', gain: '+$1.5k (+1.8%)' },
    { title: 'Portfolio two', url: '/portfolio-detail', icon: '../../assets/icon/icon.png', value: '$13.4K', gain: '+$1.1k (+1.8%)' },
    { title: 'Stocks', url: '/portfolio-detail', icon: '../../assets/icon/icon.png', value: '$3.4K', gain: '+$1.1k (+1.8%)' },
    { title: 'Crypto', url: '/portfolio-detail', icon: '../../assets/icon/icon.png', value: '$88.4K', gain: '+$1.1k (+1.8%)' },

  ];
  @ViewChild('chartCanvas')
  private chartCanvas!: ElementRef;
  public assetDate!: string;
  public assetValue!: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async ngAfterViewInit() {
    await this.create_chart();

  }
  async create_chart() {
    const response = await this.callApi();


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
        plugins: {
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: response.t,
        datasets: [
          {
            label: "Crypto",
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
            data: response.c,
            spanGaps: false,
          },
        ]
      }
    });
    console.log(this.chart.data);
    const lengthIndex = this.chart.data.labels.length-1;
    this.assetDate = this.chart.data.labels[lengthIndex];
    this.assetValue = "$ " +this.chart.data.datasets[0].data[lengthIndex];
  }
  async callApi() {
    try {
      const apiName = 'asstraApi';
      const path = '/getAsset/1';
      const queryParams = {
        dateType: '1m'
      };
      const init = {
        headers: {
          'Content-Type': 'application/json'
        },
        queryStringParameters: queryParams,
        response: true,
        // Set authorization type to AWS IAM
        auth: {
          type: 'AWS_IAM'
        }
      };
      const response = await API.get(apiName, path, init);
      console.log(response.data);
      const userInfo = await Auth.currentUserInfo();
      console.log(userInfo.id);
      return response.data;
    } catch (error) {
      console.error(error);
    }


  }

}
