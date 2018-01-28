import { PointInfo } from './PointInfo';
/**
 * 棋盤的資訊
 */
export interface PaintInfo {
    gridCount: number;
    chessSize: number;
    pointInfos: Array<PointInfo>;
    width: number;
    height: number;
}
