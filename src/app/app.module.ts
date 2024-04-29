import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateChoreComponent } from './components/create-chore/create-chore.component';
import { ListChoresComponent } from './components/list-chores/list-chores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClockComponent } from './components/clock/clock.component' 

@NgModule({
  declarations: [
    AppComponent,
    CreateChoreComponent,
    ListChoresComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
