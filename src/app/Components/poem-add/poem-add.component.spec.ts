import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemAddComponent } from './poem-add.component';

describe('PoemAddComponent', () => {
  let component: PoemAddComponent;
  let fixture: ComponentFixture<PoemAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoemAddComponent]
    });
    fixture = TestBed.createComponent(PoemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
