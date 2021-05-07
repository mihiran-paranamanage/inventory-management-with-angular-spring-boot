import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListSummaryComponent } from './item-list-summary.component';

describe('ItemListSummaryComponent', () => {
  let component: ItemListSummaryComponent;
  let fixture: ComponentFixture<ItemListSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
