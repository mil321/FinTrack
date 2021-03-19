import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExpensesPage } from './add-expenses.page';

describe('AddExpensesPage', () => {
  let component: AddExpensesPage;
  let fixture: ComponentFixture<AddExpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
