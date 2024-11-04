import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, OnDestroy, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
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
    const nextEl = (event.target as HTMLElement).nextElementSibling as HTMLElement;

    const startX = event.clientX;
    const startY = event.clientY;
    const startPrevSize = prevEl.getBoundingClientRect().width;
    const startNextSize = nextEl.getBoundingClientRect().width;


    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    const dragSubscription = mouseMove$.pipe(
      takeUntil(mouseUp$),
      map(event => {
        return {
          deltaX: event.clientX - startX
        }
      })
    ).subscribe(({ deltaX }) => {
      if (this.horizontal()) {
        let newPrevSize = startPrevSize + deltaX;
        let newNextSize = startNextSize - deltaX;
        // 限制拖拽范围，防止面板大小超出容器边界
        const minPanelSize = 0; // 设置面板的最小宽度

        if (newPrevSize < minPanelSize) {
          newPrevSize = minPanelSize;
          newNextSize = container.width - minPanelSize - 5;
        } else if (newNextSize < minPanelSize) {
          newNextSize = minPanelSize;
          newPrevSize = container.width - minPanelSize - 5;
        }

        this.prevPanelStyle = { flex: `0 0 ${newPrevSize}px` };
        this.nextPanelStyle = { flex: `0 0 ${newNextSize}px` };
      }
    });
    this.subscription.add(dragSubscription);
  }

  horizontal(): boolean {
    return this.direction === 'horizontal';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}