import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

const FRAME_WIDTH:number = 180;
const FRAME_HEIGHT:number = 135;
const NORMAL_HEIGHT:number = 125;
const MOBILE_WIDTH:number = 768;
const PORTRAIT_N_COLUMNS:number = 3;
const LANDSCAPE_N_COLUMNS:number = 3;
const W_TO_H:number = 3 / 4;
const PADDING_W = 5;
const SCROLL_BAR_W = 30;

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
    API_URL = environment.API_URL;
    MEDIA_URL = environment.MEDIA_URL;
    _data:any;

    @Input()
    set data(d:any){
        this._data = d;
    }

    constructor() { }

    ngOnInit() {

    }

    getFrameSize(){
      // adapt mobile screen
        let w:number = window.innerWidth;
        if(w <= MOBILE_WIDTH){
            let padding_w = PADDING_W * (PORTRAIT_N_COLUMNS + 1);
            let frame_w = Math.floor((w - padding_w - SCROLL_BAR_W) / PORTRAIT_N_COLUMNS);
            let frame_h = Math.floor(frame_w * W_TO_H);
            let min_frame_h = Math.floor(frame_h * 0.9);
            return {w:frame_w, h:frame_h, min_h:min_frame_h};
        }else{
            return {w:FRAME_WIDTH, h:FRAME_HEIGHT, min_h:NORMAL_HEIGHT};
        }
    }
}
