import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'ANGULAR 3D CAROUSEL';
  defaultIndex: number = 0;
  slideritems: any;
  sliderItemCount: number = 0;
  nowIndex: number = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }


  ngOnInit(): void { }


  cascadeSlider() {
    this.changeIndex(this.defaultIndex);
  }

  arrowclick(event: any) {
    console.log('event', event);
    const itemsArray: Element[] = Array.from(this.slideritems);
    const CurrentnowIndex = itemsArray.findIndex((item: Element) => item.classList.contains('now'));
    if (event == 'next') {
      if (CurrentnowIndex == this.sliderItemCount - 1) {
        this.changeIndex(0);
      } else {
        this.changeIndex(CurrentnowIndex + 1);
      }
    } else if (event == 'prev') {
      if (CurrentnowIndex == 0) {
        this.changeIndex(this.sliderItemCount - 1);
      } else {
        this.changeIndex(CurrentnowIndex - 1);
      }
    }
  }
  ngAfterViewInit() {
    this.slideritems = this.el.nativeElement.getElementsByClassName('cascade-slider_item');
    this.sliderItemCount = this.slideritems.length;

    if (this.defaultIndex === 0) {
      const lastItem = this.slideritems[this.sliderItemCount - 1];
      this.renderer.addClass(lastItem, 'prev');

      const now = this.slideritems[this.defaultIndex];
      this.renderer.addClass(now, 'now');

      const next = this.slideritems[this.defaultIndex + 1];
      this.renderer.addClass(next, 'next');
    }

    // Array.from(this.slideritems).forEach((item: Element,index : number) => {
    //   console.log(item , index)
    //   if(index == 2){
    //     this.renderer.addClass(item, 'anup');
    //   }
    //   // this.renderer.setStyle(item, 'background', '#000');

    //   // if(index === this.defaultIndex) {
    //   //   // this.renderer.addClass(item, 'now');
    //   //   const lastItem = item[3];
    //   // this.renderer.addClass(lastItem, 'now');
    //   // }
    //   if(index == this.defaultIndex + 1 ) {
    //     this.renderer.addClass(item, 'next');
    //   }
    //   if(index == this.defaultIndex - 1 ) {
    //     this.renderer.addClass(item, 'prev');
    //   }
    // });
  }

  changeIndex(nowIndex: any) {
    this.slideritems = this.el.nativeElement.getElementsByClassName('cascade-slider_item');
    const itemsArray: Element[] = Array.from(this.slideritems);
    itemsArray.forEach((item: Element, index: number) => {
      item.classList.remove('now');
      item.classList.remove('prev');
      item.classList.remove('next');
    });

    if (nowIndex == this.sliderItemCount - 1) {
      const lastItem = this.slideritems[this.defaultIndex];
      this.renderer.addClass(lastItem, 'next');
    }
    if (nowIndex == 0) {
      const lastItem = this.slideritems[this.sliderItemCount - 1];
      this.renderer.addClass(lastItem, 'prev');
    }

    itemsArray.forEach((item: Element, index: number) => {
      if (index == nowIndex) {
        const lastItem = this.slideritems[index];
        this.renderer.addClass(lastItem, 'now');
      }
      if (index == nowIndex + 1) {
        const lastItem = this.slideritems[index];
        this.renderer.addClass(lastItem, 'next');
      }
      if (index == nowIndex - 1) {
        const lastItem = this.slideritems[index];
        this.renderer.addClass(lastItem, 'prev');
      }
    });
  }
}
