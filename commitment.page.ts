import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-commitment',
  templateUrl: './commitment.page.html',
  styleUrls: ['./commitment.page.scss'],
})
export class CommitmentPage implements OnInit {
  post = {} as Post;
  posts: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {
    this.getPost();
  }

  async getPost() {
    //show loader
    let loader = await this.loadingCtrl.create({
      message:"Please wait..."
    });
    loader.present();

    try{
      this.firestore
      .collection('commitment/')
      .snapshotChanges()
      .subscribe(data => {
        this.posts = data.map(e => {
          return {
            id: e.payload.doc.id,
            commitment: e.payload.doc.data()["commitment"],
            enquiry: e.payload.doc.data()["enquiry"],
            allocation: e.payload.doc.data()["allocation"],
            date: e.payload.doc.data()["date"],
            rate: e.payload.doc.data()["rate"]
          };
        });
      });
      (await loader).dismiss();
    }catch(e){
      this.showToast(e);
    }
  }
  async deletePost(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc("commitment/"+id).delete();

    // this.firestore.doc("commitment/"+ id).delete();

    //dismiss loader
    (await loader).dismiss();
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}