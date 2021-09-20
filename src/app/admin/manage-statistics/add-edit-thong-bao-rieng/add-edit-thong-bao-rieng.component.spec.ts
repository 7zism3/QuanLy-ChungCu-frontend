import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditThongBaoRiengComponent } from './add-edit-thong-bao-rieng.component';

describe('AddEditThongBaoRiengComponent', () => {
  let component: AddEditThongBaoRiengComponent;
  let fixture: ComponentFixture<AddEditThongBaoRiengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditThongBaoRiengComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditThongBaoRiengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
