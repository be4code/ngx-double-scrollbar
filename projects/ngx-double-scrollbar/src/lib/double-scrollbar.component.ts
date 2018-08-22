import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

const SCROLL_DEBOUNCE_TIME = 300;
const WIDTH_WATCH_INTERVAL = 30;
const WIDTH_CHANGE_DEBOUNCE_TIME = 10;

@Component({
  selector: 'ngx-double-scrollbar',
  templateUrl: './double-scrollbar.component.html',
  styleUrls: ['./double-scrollbar.component.scss']
})
export class DoubleScrollbarComponent implements AfterViewInit {

  public scrollWidth: number;

  @ViewChild('secondScrollbar')
  private secondScrollbar: ElementRef;

  @ViewChild('content')
  private content: ElementRef;

  private contentScrollbarActive = false;

  private secondScrollbarActive = false;

  private widthChanges = new EventEmitter<number>();

  constructor() {
    this.widthChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(WIDTH_CHANGE_DEBOUNCE_TIME)
      )
      .subscribe(value => this.scrollWidth = value);
  }

  ngAfterViewInit(): void {
    fromEvent(this.content.nativeElement, 'scroll')
      .pipe(
        filter(() => !this.secondScrollbarActive),
        tap(() => this.contentScrollbarActive = true)
      )
      .subscribe((event: Event) => this.secondScrollbar.nativeElement.scrollLeft = event.srcElement.scrollLeft);

    fromEvent(this.content.nativeElement, 'scroll')
      .pipe(
        distinctUntilChanged(),
        debounceTime(SCROLL_DEBOUNCE_TIME)
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
        debounceTime(SCROLL_DEBOUNCE_TIME)
      )
      .subscribe(() => this.secondScrollbarActive = false);

    interval(WIDTH_WATCH_INTERVAL)
      .pipe(
        map(() => this.content.nativeElement.scrollWidth)
      )
      .subscribe(value => this.widthChanges.emit(value));
  }

}
