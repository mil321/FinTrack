import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Income } from '../models/income.mode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.page.html',
  styleUrls: ['./add-income.page.scss'],
})
export class AddIncomePage implements OnInit {
  income = {} as Income;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {}

  async createIncome(income:Income){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try{

        await this.firestore.collection("income").add(income);

        // this.firestore.collection('income/').doc().set({
        //   income: this.income.income,
        //   category: this.income.category,
        //   amount: this.income.amount,
        //   date: this.income.date,
        //   rate: this.income.rate
        // })
      } catch(e){
        this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
      //redirect to income page
      this.navCtrl.navigateRoot("income");
    }
  }

  formValidation(){
    if(!this.income.income){
      this.showToast("Enter income");
      return false;
    }
    if(!this.income.category){
      this.showToast("Enter category");
      return false;
    }
    if(!this.income.amount){
      this.showToast("Enter amount");
      return false;
    }
    if(!this.income.date){
      this.showToast("Enter date");
    }
    if(!this.income.rate){
      this.showToast("Enter rate");
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
