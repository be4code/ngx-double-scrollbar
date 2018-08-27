import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DoubleScrollbarComponent } from './double-scrollbar.component';


@Component({
  selector: 'test',
  template: `
    <ngx-double-scrollbar>
      <div style="width: 2000px">element with large content</div>
    </ngx-double-scrollbar>
  `
})
class TestComponent {
}

describe('DoubleScrollbarComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DoubleScrollbarComponent],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should scroll secondScrollbar after scrolling content', (done) => {
    // given
    const element: DebugElement = fixture.debugElement;
    const content: DebugElement = element.query(By.css('.content'));
    const secondScrollbar: DebugElement = element.query(By.css('.second-scrollbar'));
    const scrollBy = 50;
    // when
    setTimeout(() => {
      content.nativeElement.scrollLeft = scrollBy;
      content.triggerEventHandler('scroll', new Event('scroll'));

      // then
      setTimeout(() => {
        expect(secondScrollbar.nativeElement.scrollLeft).toEqual(scrollBy);
        done();
      });
    }, 60);
  });

  it('should scroll content after scrolling secondScrollbar', (done) => {
    // given
    const element: DebugElement = fixture.debugElement;
    const content: DebugElement = element.query(By.css('.content'));
    const secondScrollbar: DebugElement = element.query(By.css('.second-scrollbar'));
    const scrollBy = 150;

    // when
    setTimeout(() => {
      secondScrollbar.nativeElement.scrollLeft = scrollBy;
      secondScrollbar.nativeElement.dispatchEvent(new Event('scroll'));

      // then
      setTimeout(() => {
        expect(content.nativeElement.scrollLeft).toEqual(scrollBy);
        done();
      });
    }, 60);
  });
});
