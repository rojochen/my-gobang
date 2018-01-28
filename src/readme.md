```
五子棋題目
```

* 遊戲規則:
    單機遊戲，當落棋後下棋方會改變顏色，當五個相同顏色連在一起，跳出視窗結束遊戲，

* 系統資訊
    使用框架:Angular5 ,TypeScript,ES6

* 開發準則:
    1. 物件導向開發
    2. function分割是容易測試的(可測試化)
    3. Anuglar2+ 架構(Component Base)
 
* 物件說明

    Service Layer:
    1. IRenderService :
    負責繪制，繪圖engine是可注入的物件(Injectable)

    2. IGobandService:
    五子棋遊戲的核心邏輯，此邏輯是以class的方式注入。因為核心判斷勝負的邏輯是自己想的演算法(跟一般網路的範例程式不一橙)，在使用相同model的前提下可行抽換邏輯

    Model Layer:
    1. PointInfo:
    棋盤網格作標的資料(抽換邏輯部份需符合一樣的資料結構)

    2. PaintInfo:
    棋盤作標的資料(抽換邏輯部份需符合一樣的資料結構)

    Component Layer:
    1. CheckerboardComponent:
    Canvas 畫布產生遊戲的組件
    2. GobangGameComponent
    遊戲的組件
* 資料夾結構
    * 符合angular-cli的預設資料結構