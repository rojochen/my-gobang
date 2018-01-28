import { PointInfo } from './../model/PointInfo';
import { PaintInfo } from '../model/PaintInfo';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Inject, AfterViewInit } from '@angular/core';
import { IRenderService } from '../interface/IRenderService';
import { GobangInfoService } from '../service/gobang-info.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { CanvaseRenderService } from '../service/canvase-render.service';
import { IGobandService } from '../interface/IGobandService';


@Component({
  selector: 'app-checkerboard',
  templateUrl: './checkerboard.component.html',
  styleUrls: ['./checkerboard.component.css']
})
export class CheckerboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  @Input() gridCount: number;
  @Input() cellSize: number;
  context: CanvasRenderingContext2D;
  paintInfo: PaintInfo;
  history: PointInfo[] = new Array<PointInfo>();
  clickStream: Subscription;
  currentType: number;
  showResult: boolean;
  paintSize: { width: number, height: number };
  constructor(
    @Inject('renderService') private renderService: CanvaseRenderService,
    @Inject('gobangInfoService') private gobangInfoService: IGobandService
  ) {
    // 初始黑棋
    this.currentType = 0;
    this.showResult = false;
  }

  findIndex(index: String): PointInfo {
    const points: PointInfo[] = this.paintInfo.pointInfos;
    let result: PointInfo = null;
    for (const point of points) {
      result = point;
      if (index === point.index) {
        break;
      }
    }
    return result;
  }
  /**
   * 繪制棋盤
   */
  render(): void {
    const canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    this.renderService.setRenderingEngine(this.context);
    this.renderService.renderPaint(this.paintInfo);
    this.paintSize = { width: this.paintInfo.width, height: this.paintInfo.height };
  }
  /**
   * 判斷落棋位置是否結束
   * @param point 
   */
  isFinish(point: PointInfo): boolean {
    return this.gobangInfoService.judge(point, this.history);
  }
  /**
   * 黑白子交換
   * @param pointInfo
   */
  switch(pointInfo: PointInfo) {
    this.currentType = this.currentType === 0 ? 1 : 0;
    pointInfo.type = this.currentType;
  }
  /**
   * 1.繪制棋盤
   * 2.註刪canvas的事件
   */
  ngAfterViewInit(): void {
    this.render();
    this.clickStream = Observable.fromEvent(this.myCanvas.nativeElement, 'click').
      subscribe((res: MouseEvent) => {
        // 取得顯示作標的索引字串
        const indexStr = this.gobangInfoService.computeOffset(res.offsetX, res.offsetY, this.paintInfo.chessSize);
        const pointInfo: PointInfo = this.findIndex(indexStr);
        if (pointInfo.type === -1) {
          this.history.push(pointInfo);
          this.switch(pointInfo);
          // render chess
          this.renderService.renderChess(pointInfo, this.paintInfo.chessSize, this.currentType);
          if (this.isFinish(pointInfo)) {
            this.showResult = true;
          }
        } else {
          alert('無法下這一部');
        }
      });
  }
  ngOnDestroy(): void {
    this.clickStream.unsubscribe();
  }
  /**
   * 初始計算棋盤的資訊
   */
  ngOnInit() {
    this.paintInfo = this.gobangInfoService.compute(this.gridCount, this.cellSize);
    this.paintSize = { width: this.paintInfo.width, height: this.paintInfo.height };
  }
  /**
   * 清除所有資料
   * 1.棋盤畫布
   * 2.棋盤資料
   * 3.所有下棋的歷程資訊
   */
  clear() {
    this.context.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    this.context.beginPath();
    this.context.closePath();
    this.render();
    this.paintInfo = this.gobangInfoService.compute(this.gridCount, this.cellSize);
    this.history = new Array<PointInfo>();
    this.currentType = 0;
    this.showResult = false;
  }

}
