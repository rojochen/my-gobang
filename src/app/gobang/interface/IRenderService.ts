import { PaintInfo } from './../model/PaintInfo';
import { PointInfo } from '../model/PointInfo';

export interface IRenderService<T> {
    setRenderingEngine(engine: T);
    getRenderingEngine(): T;
    // 繪出桌布Í
    renderPaint(paintInfo: PaintInfo): void;
    // 繪出棋子
    renderChess(pointInfo: PointInfo, chessSize: number, changedType: number): void;
}
