
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

import { WizardComponent } from './wizard/wizard.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
// import { PageService } from '../pages/page.service';
// import { PagesModule } from '../pages/pages.module';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    FormsModule//,
    //PagesModule
  ],
  declarations: [
    WizardComponent,
    ImageViewerComponent,
    FeedbackComponent,
    MapComponent,
    HeaderComponent,
    FooterComponent,
    ProductGridComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:[ WizardComponent, ImageViewerComponent, FeedbackComponent, MapComponent, HeaderComponent, FooterComponent, ProductGridComponent]
})
export class SharedModule { }
