import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordCatalogComponent } from './record-catalog.component';

describe('RecordCatalogComponent', () => {
  let component: RecordCatalogComponent;
  let fixture: ComponentFixture<RecordCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
