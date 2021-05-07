import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSellComponent } from './item-sell.component';

describe('ItemSellComponent', () => {
  let component: ItemSellComponent;
  let fixture: ComponentFixture<ItemSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
