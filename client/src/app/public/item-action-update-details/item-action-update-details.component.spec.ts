import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemActionUpdateDetailsComponent } from './item-action-update-details.component';

describe('ItemActionUpdateDetailsComponent', () => {
  let component: ItemActionUpdateDetailsComponent;
  let fixture: ComponentFixture<ItemActionUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemActionUpdateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActionUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
