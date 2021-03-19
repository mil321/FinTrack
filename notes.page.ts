import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Note } from 'src/app/models/note.mode';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  note = {} as Note;
  notes: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {

    this.getNote();
  }

  async getNote() {
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try{
      this.firestore
      .collection('notes/')
      .snapshotChanges()
      .subscribe(data => {
        this.notes = data.map(e => {
          return {
            id: e.payload.doc.id,
            date: e.payload.doc.data()["date"],
            note: e.payload.doc.data()["note"]
          };
        });
        loader.dismiss();
      });
    }catch(e){
      this.showToast(e);
    }
  }

  async deleteNote(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc("notes/"+ id).delete();

    //await this.firestore.collection('users/').doc(uid).collection('notes/').doc("notes/"+ id).delete();


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
