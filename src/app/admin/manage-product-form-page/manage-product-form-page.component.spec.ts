import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductFormPageComponent } from './manage-product-form-page.component';

describe('ManageProductFormPageComponent', () => {
  let component: ManageProductFormPageComponent;
  let fixture: ComponentFixture<ManageProductFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProductFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
