import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDebtPage } from './edit-debt.page';

describe('EditDebtPage', () => {
  let component: EditDebtPage;
  let fixture: ComponentFixture<EditDebtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDebtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDebtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
