import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPoemComponent } from './best-poem.component';

describe('BestPoemComponent', () => {
  let component: BestPoemComponent;
  let fixture: ComponentFixture<BestPoemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestPoemComponent]
    });
    fixture = TestBed.createComponent(BestPoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
