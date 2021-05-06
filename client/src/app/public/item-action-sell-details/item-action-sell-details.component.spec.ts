import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionSellDetailsComponent } from './item-action-sell-details.component';

describe('ItemActionSellDetailsComponent', () => {
  let component: ItemActionSellDetailsComponent;
  let fixture: ComponentFixture<ItemActionSellDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemActionSellDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActionSellDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
