import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'ngx-double-scrollbar',
  templateUrl: './double-scrollbar.component.html',
  styleUrls: ['./double-scrollbar.component.scss']
})
export class DoubleScrollbarComponent implements AfterViewInit {
  @ViewChild('secondScrollbar')
  private secondScrollbar: ElementRef;

  @ViewChild('content')
  private content: ElementRef;

  ngAfterViewInit(): void {
    fromEvent(this.content.nativeElement, 'scroll')
      .subscribe((event: Event) => this.secondScrollbar.nativeElement.scrollLeft = event.srcElement.scrollLeft);

    fromEvent(this.secondScrollbar.nativeElement, 'scroll')
      .subscribe((event: Event) => this.content.nativeElement.scrollLeft = event.srcElement.scrollLeft);
  }
}
