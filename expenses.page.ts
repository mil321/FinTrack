import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Expense } from 'src/app/models/expense.mode';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
expense = {} as Expense;
expenses: any;
total: number=0
amount: number=0
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService,
  ) { }

  ngOnInit() {
    this.getExpenses();
  }
    

  async getExpenses() {
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try{
      this.firestore
      .collection('expense/')
      .snapshotChanges()
      .subscribe(data => {
        this.expenses = data.map(e => {
          return {
            id: e.payload.doc.id,
            expense: e.payload.doc.data()["exepense"],
            category: e.payload.doc.data()["category"],
            amount: e.payload.doc.data()["amount"],
            date: e.payload.doc.data()["date"],
            note: e.payload.doc.data()["note"]
          };
        });
      });



      // this.firestore.collection('users/').doc(`${this.user.getUID()}/`).collection('expense/')
      // .snapshotChanges()
      // .subscribe(data => {
        
      //   this.total += this.total + this.expense.amount
      //   this.expenses = data.map(e => {
      //     return {
      //       expense: e.payload.doc.data()["expense"],
      //       category: e.payload.doc.data()["category"],
      //       amount: e.payload.doc.data()["amount"],
      //       date: e.payload.doc.data()["date"],
      //       note: e.payload.doc.data()["note"]
      //     };
      //   });
            // this.expense.expense = data["expense"];
            // this.expense.category = data["category"];
            // this.expense.amount = data["amount"];
            // this.expense.date = data["date"];
            // this.expense.date = data["note"]
            // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+this.total)
          //  });
       (await loader).dismiss();
    }catch(e){
      this.showToast(e);
    }
  }
  
  async deleteExpense(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    
    await this.firestore.doc("expense/"+id).delete();
    //dismiss loader

    (await loader).dismiss();
  }

  // async deleteExpense(id: string){
  //   //show loader
  //   let loader = this.loadingCtrl.create({
  //     message: "Please wait..."
  //   });
  //   (await loader).present();

  //   await this.firestore.collection('users/').doc(`${this.user.getUID()}/`).collection('expense/').doc("expense/"+ id).delete();

  //   //dismiss loader
  //   (await loader).dismiss();
  // }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
