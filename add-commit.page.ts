import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from 'src/app/models/post.mode';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-commit',
  templateUrl: './add-commit.page.html',
  styleUrls: ['./add-commit.page.scss'],
})
export class AddCommitPage implements OnInit {
  post = {} as Post;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {}

  async createPost(post: Post){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
      message: "Please wait..."
      });
      (await loader).present();
  
      try{
        await this.firestore.collection("commitment").add(post);

        // this.firestore.collection('users/').doc(`${this.user.getUID()}/`).collection('commitment/').doc().set({
        //   commitment: this.post.commitment,
        //   enquiry: this.post.enquiry,
        //   allocation: this.post.allocation,
        //   date: this.post.date,
        //   rate: this.post.rate
        // })
      } catch(e){
      this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
      //redirect to home page
      this.navCtrl.navigateRoot("commitment");
        }
      }
  
      formValidation(){
      if(!this.post.commitment){
      this.showToast("Enter commitment");
      return false;
      }
      if(!this.post.enquiry){
      this.showToast("Enter enquiry");
      return false;
      }
      if(!this.post.allocation){
      this.showToast("Enter allocation");
      return false;
      }
      if(!this.post.date){
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
  