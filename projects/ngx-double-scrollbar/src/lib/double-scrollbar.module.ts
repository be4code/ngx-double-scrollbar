import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleScrollbarComponent } from './double-scrollbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DoubleScrollbarComponent],
  exports: [DoubleScrollbarComponent]
})
export class DoubleScrollbarModule {
}
