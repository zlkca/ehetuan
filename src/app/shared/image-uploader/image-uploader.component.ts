import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedService } from '../shared.service';
import { NgRedux } from '@angular-redux/store';
import { IPicture, PictureActions } from '../../commerce/commerce.actions';

//const ADD_IMAGE = environment.MEDIA_URL + 'add_photo.png';
const ADD_IMAGE = 'add_photo.png';
const FRAME_W = 80;
const FRAME_H = 80;
const IMAGE_W = 80;
const IMAGE_H = 80;


@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @ViewChild('uploadInput') uploadInput:ElementRef;
	@Input() data : any; // single image with structure {image:{data:'url', file:'file data'}}
	_data:any;
  currPic:any = {index:0, data:'', file:''};
  pic:any;
	MEDIA_ROOT = environment.MEDIA_URL;

	// set data(d:any){
	//     this._data = d;
	// }
  constructor(private rx:NgRedux<IPicture>, private sharedServ:SharedService) { }

  ngOnInit(){

  }

  ngOnChanges() {
    if(this.data){
      this.pic = this.data;
    }
  	
  	let ret = this.sharedServ.resizeImage(FRAME_W, FRAME_H, IMAGE_W, IMAGE_H);

    if(this.pic && this.pic.image && !this.pic.image.data){
      this.pic.image = {index:0, data:ADD_IMAGE, file:''};
    }
  }

    getImageSrc(image:any){
      if(image.file){
        return image.data;
      }else{
        return this.MEDIA_ROOT + image.data
      }
    }

    onLoadImage(){
      let el = this.uploadInput.nativeElement as HTMLElement;
      el.click();//('[name="image"]').click();
    }

    onDeleteImage(){
        let pic = this.data;
        pic.image.data = '';
        pic.image.file = '';
        this.data = pic;
    }

    onImageChange(event:any, i:number){
        let self = this;
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
              if(self.data && self.data.id){
                let newData = { ...self.data, image:{data: reader.result, file: event.target.files[0]}, status:'change'};
                self.pic = newData;
                self.rx.dispatch({ type: PictureActions.CHANGE_PICTURE, 
                  payload:newData
                });
                self.currPic = {data:ADD_IMAGE, file:''};
              }else{
                let newData = { ...self.data, image:{data: reader.result, file: event.target.files[0]}, status:'add'};
                self.pic = newData;
                self.rx.dispatch({ type: PictureActions.ADD_PICTURE,
                  payload:newData
                });

              }//.split(',')[1];
              //self.wechatgroup.logo = event.target.files[0];
              //   this.form.get('avatar').setValue({
              //     filename: file.name,
              //     filetype: file.type,
              //     value: reader.result.split(',')[1]
              //   })
          }
        }
    }

}
