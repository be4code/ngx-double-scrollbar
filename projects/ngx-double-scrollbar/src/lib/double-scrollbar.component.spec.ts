import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DoubleScrollbarComponent } from './double-scrollbar.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


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
      declarations: [TestComponent, DoubleScrollbarComponent]
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

  it('should scroll secondScrollbar after scrolling wrapper', () => {
    // given
    const element: DebugElement = fixture.debugElement;
    const wrapper: DebugElement = element.query(By.css('.wrapper'));
    const secondScrollbar: DebugElement = element.query(By.css('.second-scrollbar'));
    const scrollBy = 50;

    // when
    wrapper.nativeElement.scrollLeft = scrollBy;
    wrapper.nativeElement.dispatchEvent(new Event('scroll'));

    // then
    expect(secondScrollbar.nativeElement.scrollLeft).toEqual(scrollBy);
  });

  it('should scroll wrapper after scrolling secondScrollbar', () => {
    // given
    const element: DebugElement = fixture.debugElement;
    const wrapper: DebugElement = element.query(By.css('.wrapper'));
    const secondScrollbar: DebugElement = element.query(By.css('.second-scrollbar'));
    const scrollBy = 50;

    // when
    secondScrollbar.nativeElement.scrollLeft = scrollBy;
    secondScrollbar.nativeElement.dispatchEvent(new Event('scroll'));

    // then
    expect(wrapper.nativeElement.scrollLeft).toEqual(scrollBy);
  });
});
