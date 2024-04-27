import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateChoreComponent } from './components/create-chore/create-chore.component';
import { ListChoresComponent } from './components/list-chores/list-chores.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateChoreComponent,
    ListChoresComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
