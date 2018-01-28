import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobangGameComponent } from './gobang-game/gobang-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckerboardComponent } from './checkerboard/checkerboard.component';
import { CanvaseRenderService } from './service/canvase-render.service';
import { GobangInfoService } from './service/gobang-info.service';
@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  providers: [
    { provide: 'renderService', useClass: CanvaseRenderService },
    { provide: 'gobangInfoService', useClass: GobangInfoService }
  ],
  declarations: [   GobangGameComponent, CheckerboardComponent],
  exports: [   GobangGameComponent, CheckerboardComponent]
})
export class GobangModule { }
