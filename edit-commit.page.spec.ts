import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCommitPage } from './edit-commit.page';

describe('EditCommitPage', () => {
  let component: EditCommitPage;
  let fixture: ComponentFixture<EditCommitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
