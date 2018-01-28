import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckerboardComponent } from '../checkerboard/checkerboard.component';

@Component({
  selector: 'app-gobang-game',
  templateUrl: './gobang-game.component.html',
  styleUrls: ['./gobang-game.component.css']
})
export class GobangGameComponent implements OnInit {
  gameForm: FormGroup;
  gridCount = 10;
  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      gridCount: [this.gridCount, Validators.required],
    });
  }
  rerender(checkerboard: CheckerboardComponent): void {
      checkerboard.clear();
  }

  ngOnInit() {
  }

}


