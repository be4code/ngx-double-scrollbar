import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DoubleScrollbarModule } from 'ngx-double-scrollbar';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DoubleScrollbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
