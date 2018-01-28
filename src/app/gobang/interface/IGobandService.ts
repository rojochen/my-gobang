import {PaintInfo} from '../model/PaintInfo';
import {PointInfo} from '../model/PointInfo';
export interface IGobandService {
    judge(pointInfo: PointInfo, history: PointInfo[]): boolean ;
    compute(gridCount: number, chessSize: number): PaintInfo ;
    computeOffset(x: number  , y: number  , chessSize: number): string ;
}
