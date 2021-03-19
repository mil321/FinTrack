import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Expense } from 'src/app/models/expense.mode';

@Component({
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.page.html',
  styleUrls: ['./edit-expenses.page.scss'],
})
export class EditExpensesPage implements OnInit {
 expense = {} as Expense;
 id: any;
  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.getExpenseById(this.id);
  }

  async getExpenseById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("expense/" + id)
    .valueChanges()
    .subscribe(data => {
    this.expense.expense= data["date"];
    this.expense.category = data["category"];
    this.expense.amount = data["amount"];
    this.expense.date = data["date"];
    this.expense.note = data["note"]
 });
 //dismiss loader
 (await loader).dismiss();
 }

 async updateExpense(expense: Expense){
  if(this.formValidation()) {
  //show loader
  let loader = this.loadingCtrl.create({
  message: "Please wait..."
  });
  (await loader).present();
 
  try{
 
  await this.firestore.doc("expense/" + this.id).update(expense);
  } catch(e){
  this.showToast(e);
  }
  //dismiss loader
  (await loader).dismiss();
 
  //redirect to view post page
  this.navCtrl.navigateRoot("expense");
  }
  }

  formValidation(){
    if(!this.expense.expense){
      this.showToast("Enter expense");
      return false;
    }
    if(!this.expense.category){
      this.showToast("Enter category");
      return false;
    }
    if(!this.expense.amount){
      this.showToast("Enter amount");
      return false;
    }
    if(!this.expense.date){
      this.showToast("Enter date");
      return false;
    }
    return true;
  }
  showToast(message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }
}
