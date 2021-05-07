import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionInsertDetailsComponent } from './item-action-insert-details.component';

describe('ItemActionInsertDetailsComponent', () => {
  let component: ItemActionInsertDetailsComponent;
  let fixture: ComponentFixture<ItemActionInsertDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemActionInsertDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActionInsertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
