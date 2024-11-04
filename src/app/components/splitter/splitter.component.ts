import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnDestroy, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-splitter',
  templateUrl: './splitter.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./splitter.component.scss']
})
export class SplitterComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(TemplateRef) panels!: QueryList<TemplateRef<any>>;
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() gutterSize = 5;
  @Input() minSize = 0;
  prevPanelStyle = {};
  nextPanelStyle = {};


  private subscription: Subscription = new Subscription();

  constructor(private host: ElementRef) {

  }

  ngAfterContentInit(): void {
    if (this.panels.length < 2) {
      console.log('Please provide at least two panels');
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    const container = this.host.nativeElement.getBoundingClientRect();
    const prevEl = (event.target as HTMLElement).previousElementSibling as HTMLElement;
    // const startX = event.clientX;
    const startOffset = this.horizontal() ? event.clientX : event.clientY;
    const startPrevSize = this.horizontal() ? prevEl.getBoundingClientRect().width : prevEl.getBoundingClientRect().height;
    // const startPrevSize = prevEl.getBoundingClientRect().width;
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    const dragSubscription = mouseMove$.pipe(
      takeUntil(mouseUp$),
      map(event => (this.horizontal() ? event.clientX : event.clientY) - startOffset)
    ).subscribe((delta) => {
        this.updatePanelSizes(startPrevSize, delta, this.horizontal() ? container.width : container.height);
    });

    this.subscription.add(dragSubscription);
  }

  /**
   * Updates the panel sizes by changing the flex basis of the panels.
   * @param startPrevSize The initial size of the previous panel.
   * @param deltaX The change in the X position of the mouse.
   * @param containerWidth The width of the container.
   */
  private updatePanelSizes(startPrevSize: number, delta: number, containerSize: number) {
    const newPrevSize = this.clamp(startPrevSize + delta, this.minSize, containerSize - this.minSize - this.gutterSize);
    const newNextSize = containerSize - newPrevSize - this.gutterSize;

    // this.prevPanelStyle = { flex: `0 0 ${newPrevSize}px` };
    // this.nextPanelStyle = { flex: `0 0 ${newNextSize}px` };
    this.prevPanelStyle = { flex: `0 0 ${newPrevSize}px` };
    this.nextPanelStyle = { flex: `0 0 ${newNextSize}px` };
  }

  private clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  horizontal(): boolean {
    return this.direction === 'horizontal';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}