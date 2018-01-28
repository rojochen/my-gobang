import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GobangModule } from './gobang/gobang.module'; 
 @NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, GobangModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
