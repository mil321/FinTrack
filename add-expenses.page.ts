import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Expense } from 'src/app/models/expense.mode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.page.html',
  styleUrls: ['./add-expenses.page.scss'],
})
export class AddExpensesPage implements OnInit {
  expense = {} as Expense;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {}

  async createExpense(expense:Expense){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try{
        await this.firestore.collection("expense").add(expense);


        // this.firestore.collection('users/').doc(`${this.user.getUID()}/`).collection('expense/').doc().set({
        //   expense: this.expense.expense,
        //   category: this.expense.category,
        //   amount: this.expense.amount,
        //   date: this.expense.date,
        //   note: this.expense.note
        // })
      } catch (e){
        this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
      //redirect to expenses page
      this.navCtrl.navigateRoot("expenses");
    }}
  
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
