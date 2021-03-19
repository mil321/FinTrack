import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditExpensesPage } from './edit-expenses.page';

describe('EditExpensesPage', () => {
  let component: EditExpensesPage;
  let fixture: ComponentFixture<EditExpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
