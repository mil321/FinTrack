import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCommitPage } from './add-commit.page';

describe('AddCommitPage', () => {
  let component: AddCommitPage;
  let fixture: ComponentFixture<AddCommitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
