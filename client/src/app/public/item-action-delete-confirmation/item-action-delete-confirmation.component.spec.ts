import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionDeleteConfirmationComponent } from './item-action-delete-confirmation.component';

describe('ItemActionDeleteConfirmationComponent', () => {
  let component: ItemActionDeleteConfirmationComponent;
  let fixture: ComponentFixture<ItemActionDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemActionDeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActionDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
