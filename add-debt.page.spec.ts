import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDebtPage } from './add-debt.page';

describe('AddDebtPage', () => {
  let component: AddDebtPage;
  let fixture: ComponentFixture<AddDebtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDebtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDebtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
