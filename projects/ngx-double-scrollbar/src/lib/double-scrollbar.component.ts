import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

const WIDTH_WATCH_INTERVAL = 30;
const WIDTH_CHANGE_DEBOUNCE_TIME = 10;

@Component({
  selector: 'ngx-double-scrollbar',
  templateUrl: './double-scrollbar.component.html',
  styleUrls: ['./double-scrollbar.component.scss']
})
export class DoubleScrollbarComponent implements AfterViewInit, OnDestroy {

  public scrollWidth: number;

  @ViewChild('secondScrollbar')
  private secondScrollbar: ElementRef;

  @ViewChild('content')
  private content: ElementRef;

  private widthChanges = new EventEmitter<number>();

  private scrollChange: Subscription;

  private widthInterval: Subscription;

  private lastUsedElement: Element;

  private lastUsedTime: number = DoubleScrollbarComponent.now();

  constructor() {
    this.widthChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(WIDTH_CHANGE_DEBOUNCE_TIME)
      )
      .subscribe(value => this.scrollWidth = value);
  }

  private static now(): number {
    return new Date().getTime();
  }

  ngAfterViewInit(): void {
    this.scrollChange = merge(
      fromEvent(this.content.nativeElement, 'scroll'),
      fromEvent(this.secondScrollbar.nativeElement, 'scroll')
    )
      .pipe(
        map((event: Event) => event.srcElement),
        filter(srcElement => {
          const enoughDiff = DoubleScrollbarComponent.now() - this.lastUsedTime < 30;
          const sameElement = enoughDiff && this.lastUsedElement == srcElement;
          return this.lastUsedElement === undefined || sameElement || !enoughDiff;
        }),
        tap(srcElement => {
          this.lastUsedTime = DoubleScrollbarComponent.now();
          this.lastUsedElement = srcElement;
        })
      )
      .subscribe(srcElement => {
        const targetElement = this.getTargetElement(srcElement).nativeElement;
        targetElement.scrollLeft = srcElement.scrollLeft;
      });

    this.widthInterval = interval(WIDTH_WATCH_INTERVAL)
      .pipe(
        map(() => this.content.nativeElement.scrollWidth)
      )
      .subscribe(value => this.widthChanges.emit(value));
  }

  ngOnDestroy(): void {
    this.scrollChange.unsubscribe();
    this.widthInterval.unsubscribe();
  }

  private getTargetElement(srcElement: Element): ElementRef {
    return srcElement == this.content.nativeElement ? this.secondScrollbar : this.content;
  }
}
