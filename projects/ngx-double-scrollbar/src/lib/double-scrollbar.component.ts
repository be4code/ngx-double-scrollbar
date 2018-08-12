import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

const DEBOUNCE_TIME = 300;

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

  private contentScrollbarActive = false;

  private secondScrollbarActive = false;

  ngAfterViewInit(): void {
    fromEvent(this.content.nativeElement, 'scroll')
      .pipe(
        tap(console.log),
        filter(() => !this.secondScrollbarActive),
        tap(() => this.contentScrollbarActive = true)
      )
      .subscribe((event: Event) => this.secondScrollbar.nativeElement.scrollLeft = event.srcElement.scrollLeft);

    fromEvent(this.content.nativeElement, 'scroll')
      .pipe(
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_TIME)
      )
      .subscribe(() => this.contentScrollbarActive = false);

    fromEvent(this.secondScrollbar.nativeElement, 'scroll')
      .pipe(
        filter(() => !this.contentScrollbarActive),
        tap(() => this.secondScrollbarActive = true)
      )
      .subscribe((event: Event) => this.content.nativeElement.scrollLeft = event.srcElement.scrollLeft);

    fromEvent(this.secondScrollbar.nativeElement, 'scroll')
      .pipe(
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_TIME)
      )
      .subscribe(() => this.secondScrollbarActive = false);
  }
}
