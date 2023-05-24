import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { AppComponent } from '../app.component'; 

import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.scss']
})
export class TransformComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  sampleData: any = [
    { id: 0, value: 0 }, { id: 1, value: 0 }, { id: 2, value: 0 }, { id: 3, value: 0 }, { id: 4, value: 0 }, { id: 5, value: 0 }, { id: 6, value: 0 }, { id: 7, value: 0 }, { id: 8, value: 0 }, { id: 9, value: 0 }, { id: 10, value: 0 }, 
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
    this.transformChartData.labels = [];
    this.transformChartData.datasets[0].data = [];
    this.sampleData.forEach((item: any) => {
      this.transformChartData.labels?.push(item.id);
      this.transformChartData.datasets[0].data.push(item.value);
    });
    this.chart?.update();
  }

  updateData() {
    this.transformChartData.labels = [];
    this.transformChartData.datasets[0].data = [];
    this.appComponent.transformData.forEach((item: any) => {
      this.transformChartData.labels?.push(item.id);
      this.transformChartData.datasets[0].data.push(item.value);
    });
    this.chart?.update();
  }

  public transformChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'transform',
        backgroundColor: 'rgba(0, 160, 0, 1)',
        borderColor: 'rgba(0, 160, 0, 1)',
        pointBackgroundColor: 'rgba(0, 160, 0, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(0, 160, 0, 1)', 
        fill: 'origin',
      }
    ],
    labels: []
  };

  public transformChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {},
      y: {
        position: 'left',
        beginAtZero: true,
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

  public transformChartType: ChartType = 'bar';
}
