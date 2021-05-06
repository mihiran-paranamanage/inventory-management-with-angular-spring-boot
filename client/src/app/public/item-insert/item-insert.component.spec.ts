import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInsertComponent } from './item-insert.component';

describe('ItemInsertComponent', () => {
  let component: ItemInsertComponent;
  let fixture: ComponentFixture<ItemInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
