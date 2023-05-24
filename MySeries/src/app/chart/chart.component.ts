import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { AppComponent } from '../app.component'; 

import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  sampleData: any = [
    { id: 0, value: 0 }, { id: 1, value: 0 }, { id: 2, value: 0 }, { id: 3, value: 0 }, { id: 4, value: 0 }, { id: 5, value: 0 }, { id: 6, value: 0 }, 
  ];

  constructor(public appComponent: AppComponent, private actionService: ActionsService) { }

  ngOnInit(): void {
    this.actionService.currentActionStageMessage.subscribe(msg => { 
      switch (msg) {
        case 'init':
          this.initData();
          break;
        case 'generate':
          this.updateData();
          break;
        default:
          break;
      }
    });
  }

  initData() {
    this.seriesChartData.labels = [];
    this.seriesChartData.datasets[0].data = [];
    this.sampleData.forEach((item: any) => {
      this.seriesChartData.labels?.push(item.id);
      this.seriesChartData.datasets[0].data.push(item.value);
    });
    this.chart?.update();
  }

  updateData() {
    this.seriesChartData.labels = [];
    this.seriesChartData.datasets[0].data = [];
    this.appComponent.seriesData.forEach((item: any) => {
      this.seriesChartData.labels?.push(item.id);
      this.seriesChartData.datasets[0].data.push(item.value);
    });
    this.chart?.update();
  }

  public seriesChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: 'rgba(250, 25, 0, 0.3)',
        borderColor: 'rgba(250, 25, 0, 1)',
        pointBackgroundColor: 'rgba(250, 25, 0, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(250, 25, 0, 1)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public seriesChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {},
      y: {
        position: 'left',
        grid: {
          color: 'rgba(100, 100, 100, 0.3)',
        },
        ticks: {
          color: 'rgba(100, 100, 100, 1)'
        }
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    } 
  };

  public seriesChartType: ChartType = 'line';
}
