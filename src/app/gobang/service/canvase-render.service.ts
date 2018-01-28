import { IRenderService } from './../interface/IRenderService';
import { Injectable } from '@angular/core';
import { PaintInfo } from '../model/PaintInfo';
import { PointInfo } from '../model/PointInfo';


@Injectable()
export class CanvaseRenderService implements IRenderService<CanvasRenderingContext2D> {
  private _engine: CanvasRenderingContext2D;
  constructor() { }
  /**
   * 設定繪圖的API
   * @param engine
   */
  setRenderingEngine(engine: CanvasRenderingContext2D) {
    this._engine = engine;
  }
  getRenderingEngine(): CanvasRenderingContext2D {
    return this._engine;
  }
  private getChessColor(type: number): string {
    if (type === 0) {
      return '#fff';
    } else if (type === 1) {
      return '#111';
    } else {
      throw new Error('not found chess');
    }
  }
  /**
   * 繪出棋盤桌布
   * @param paintInfo
   */
  renderPaint(paintInfo: PaintInfo): void {
    if (!this._engine) {
      throw new Error('Rendering Engine should not be null ');
    }
    for (let i = 0; i <= paintInfo.gridCount; i++) {
      this._engine.beginPath();
      this._engine.moveTo(paintInfo.chessSize * i, 0);
      this._engine.lineTo(paintInfo.chessSize * i, paintInfo.width);
      this._engine.closePath();
      this._engine.stroke();
      this._engine.beginPath();
      this._engine.moveTo(0, paintInfo.chessSize * i);
      this._engine.lineTo(paintInfo.height, paintInfo.chessSize * i);
      this._engine.closePath();
      this._engine.stroke();
    }
  }
   /**
    * 繪出棋子
    * @param pointInfo
    * @param chessSize
    * @param chessType
    */
  renderChess(pointInfo: PointInfo, chessSize: number, chessType: number): void {
    if (!this._engine) {
      throw new Error('Rendering Engine should not be null ');
    }
    this._engine.fillStyle = this.getChessColor(chessType);
    this._engine.beginPath();
    this._engine.arc(pointInfo.x, pointInfo.y, chessSize / 2, 0, 2 * Math.PI, true);
    this._engine.stroke();
    this._engine.fill();
  }

}
