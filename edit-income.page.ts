import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Income } from '../models/income.mode';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.page.html',
  styleUrls: ['./edit-income.page.scss'],
})
export class EditIncomePage implements OnInit {
  income = {} as Income;
  id: any;
  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getIncomeById(this.id);
  }

  async getIncomeById(id:string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    this.firestore.doc("income/"+id)
    .valueChanges()
    .subscribe(data => {
      this.income.income = data["income"];
      this.income.category = data ["category"];
      this.income.amount = data["amount"];
      this.income.date = data["date"];
      this.income.rate = data["rate"];
    });
    //dismiss loader
    (await loader).dismiss();
  }

  async updateIncome(income: Income){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message:"Please wait..."
      });
      (await loader).present();

      try{
        await this.firestore.doc("income/"+this.id).update(income);
      } catch(e) {
        this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();

      //redirect to view post page
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
    return false;
    }
    return true;
    }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }

}