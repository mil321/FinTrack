import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Note } from 'src/app/models/note.mode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.page.html',
  styleUrls: ['./add-notes.page.scss'],
})
export class AddNotesPage implements OnInit {
 note = {} as Note;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {}
  async createNote(note: Note){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
      message: "Please wait..."
      });
      (await loader).present();
  
      try{
        await this.firestore.collection("notes").add(note);

        // this.firestore.collection('users/').doc(`${this.user.getUID()}/`).collection('note/').doc().set({
        //   date: this.note.date,
        //   note: this.note.note
        // })
      } catch(e){
      this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
      //redirect to home page
      this.navCtrl.navigateRoot("notes");
        }
      }
  
      formValidation(){
      if(!this.note.date){
      this.showToast("Enter date");
      return false;
      }
      if(!this.note.note){
      this.showToast("Enter note");
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
