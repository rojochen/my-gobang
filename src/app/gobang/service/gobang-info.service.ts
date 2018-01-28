import { PointInfo } from './../model/PointInfo';
import { Observable } from 'rxjs/Observable';
import { PaintInfo } from './../model/PaintInfo';
import { Injectable } from '@angular/core';
import { IGobandService } from '../interface/IGobandService';
/**
 * 五子棋的比對判斷方向
 */
enum Directions {
  POSITIVE_HORIZONTAL = 1,
  NEGATIVE_HORIZONTAL = 2,
  POSITIVE_VERTICAL = 3,
  NEGATIVE_VERTICAL = 4,
  POSITIVE_SLASH = 5,
  NEGATIVE_SLASH = 6,
  POSITIVE_BACKSLASH = 7,
  NEGATIVE_BACKSLASH = 8,
}
interface ConditionDetail {
  points: String[];
  count: number;
}
interface ConditionInfo {
  [index: string]: ConditionDetail;
}

@Injectable()
export class GobangInfoService implements IGobandService {
  constructor() {
  }
  /**
   * 新增索引值到比對的陣列
   * @param result
   * @param oppositePoints
   * @param index
   */
  private addResult(result: string[], oppositePoints: string[], index: string): string[] {
    // 只新增oppositePoints沒有的索引值
    if (oppositePoints.indexOf(index) === -1) {
      result.push(index);
    }
    return result;
  }
  /**
   * 計算相同顏色棋子的勝利位置(五個連續都相同顏色)
   * @param flag
   * @param pointInfo
   * @param oppositePoints
   */
  private getArea(flag: Directions, pointInfo: PointInfo, oppositePoints: string[]): String[] {
    const array: string[] = pointInfo.index.split('_');
    const x: string = array[0];
    const y: string = array[1];
    const results: string[] = [];
    for (let i = 1; i < 5; i++) {
      const tempY = Number.parseInt(y);
      const tempX = Number.parseInt(x);
      let index: string;
      switch (flag) {
        case Directions.POSITIVE_HORIZONTAL:
          index = x + '_' + (tempY + i).toString();
          break;
        case Directions.NEGATIVE_HORIZONTAL:
          index = x + '_' + (tempY - i).toString();
          break;
        case Directions.POSITIVE_VERTICAL:
          index = (tempX + i).toString() + '_' + y;
          break;
        case Directions.NEGATIVE_VERTICAL:
          index = (tempX - i).toString() + '_' + y;
          break;
        case Directions.POSITIVE_SLASH:
          index = (tempX + i).toString() + '_' + (tempY + i).toString();
          break;
        case Directions.NEGATIVE_SLASH:
          index = (tempX - i).toString() + '_' + (tempY - i).toString();
          break;
        case Directions.POSITIVE_BACKSLASH:
          index = (tempX + i).toString() + '_' + (tempY - i).toString();
          break;
        case Directions.NEGATIVE_BACKSLASH:
          index = (tempX - i).toString() + '_' + (tempY + i).toString();
          break;
        default:
          throw new Error('unknow Directions');
      }
      this.addResult(results, oppositePoints, index);
    }

    return results;
  }
  private getChessCount(p: PointInfo, conditionDetail: ConditionDetail): ConditionDetail {
    if (conditionDetail.points.indexOf(p.index) >= 0) {
      console.log(`${p.type} hit + ${p.index}`);
      conditionDetail.count++;
    }
    return conditionDetail;
  }
  /**
   * 判斷是否結束比賽
   * @param pointInfo
   * @param history
   * @returns boolean
   */
  judge(pointInfo: PointInfo, history: PointInfo[]): boolean {
    // 1.先分類相同type(顏色的棋子)
    const currentHistory = history.filter(function (p, i) {
      return p.type === pointInfo.type;
    });
    const oppositePoints: string[] = new Array<string>();
    // 2.不同顏色的棋子存放在另一維陣列
    const oppositeHistory = history.filter(function (p, i) {
      if (p.type !== pointInfo.type) {
        oppositePoints.push(p.index);
      }
    });
    // 3.初始化勝利條件的資訊
    const conditionList: ConditionDetail[] = new Array<ConditionDetail>();
    // tslint:disable-next-line:forin
    for (const direction in Directions) {
      if (!isNaN(Number(direction))) {
        conditionList.push({
          points: this.getArea(Number.parseInt(direction), pointInfo, oppositePoints),
          count: 1
        });
      }
    }

    let result = false;
    let isWin = false;
    //  4.從記錄確認 - 同棋子(同顏色)是否符合五字棋規
    for (let i = 0, l = currentHistory.length; i < l; i++) {
      const p = currentHistory[i];
      for (let j = 0; j < conditionList.length; j++) {
        result = this.getChessCount(p, conditionList[j]).count === 5;
        if (result === true) {
          isWin = true;
          break;
        }
      }
      if (isWin === true) {
        break;
      }
    }
    return isWin;
  }
  /**
   * 計算棋般作標系統
   * @param gridCount
   * @param chessSize
   */
  compute(gridCount: number, chessSize: number): PaintInfo {
    const pointInfos = new Array<PointInfo>();
    const width = gridCount * chessSize;
    const height = gridCount * chessSize;
    for (let i = 0; i <= gridCount; i++) {
      const x = chessSize * i;
      for (let j = 0; j <= gridCount; j++) {
        const y = chessSize * j;
        const type = -1;
        const index = i.toString() + '_' + j.toString();
        pointInfos.push({ x, y, type, index });
      }
    }
    return { gridCount, chessSize, pointInfos, width, height };
  }
  /**
   * 計算棋子索引值
   * @param x
   * @param y
   * @param chessSize
   */
  computeOffset(x: number = 0, y: number = 0, chessSize: number): string {
    if (chessSize === 0) {
      throw new Error('computeOffset error : Chess Size is 0');
    }
    const _x = Math.round(x / chessSize);
    const _y = Math.round(y / chessSize);
    const indexStr: string = _x.toString() + '_' + _y.toString();
    // console.log(`input: ${x} ${y} ${_x} ${_y} ,result :${indexStr}`);
    return indexStr;
  }
}
