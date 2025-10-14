import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pract } from './pract';

describe('Pract', () => {
  let component: Pract;
  let fixture: ComponentFixture<Pract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pract]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pract);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
