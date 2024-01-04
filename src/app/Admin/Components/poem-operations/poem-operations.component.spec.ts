import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemOperationsComponent } from './poem-operations.component';

describe('PoemOperationsComponent', () => {
  let component: PoemOperationsComponent;
  let fixture: ComponentFixture<PoemOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoemOperationsComponent]
    });
    fixture = TestBed.createComponent(PoemOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
