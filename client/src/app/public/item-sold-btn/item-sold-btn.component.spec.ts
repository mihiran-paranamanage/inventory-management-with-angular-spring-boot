import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSoldBtnComponent } from './item-sold-btn.component';

describe('ItemSoldBtnComponent', () => {
  let component: ItemSoldBtnComponent;
  let fixture: ComponentFixture<ItemSoldBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSoldBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSoldBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
