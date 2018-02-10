import { Upload } from './../models/upload';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';




@Injectable()
// export class UploadService {

//   constructor(private db: AngularFirestore) { }

//   pushUpload(upload: Upload) {
//     let storageRef = firebase.storage().ref();
//     let uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);
//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//       (snapshot) =>  {
//         // upload in progress
//         upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
//       },
//       (error) => {
//         // upload failed
//         console.log(error)
//       },
//       () => {
//         // upload success
//         upload.url = uploadTask.snapshot.downloadURL
//         upload.name = upload.file.name
//         //this.saveFileData(upload)
//       }
//     );
//   }
//   // Writes the file details to the realtime db
//   // private saveFileData(upload: Upload) {
//   //   this.db.list(`uploads`).push(upload);
//   // }
// }
export class UploadService {

  private _subscription: Subscription;
  private basePath: string = '/insuranceFiles';
  //uploads: FirebaseListObservable<Upload[]>;

  uploadCollection:AngularFirestoreCollection<Upload>;
  upload: Observable<Upload[]>;
  uploadDoc: AngularFirestoreDocument<Upload>;


  constructor(private db: AngularFirestore) { }

   saveFileDataFirestore(upload: Upload){
    const collectionRef = this.db.collection(`${this.basePath}/`); //ref
  
    //delete file field to allow upload to firestore
    delete upload.file;
  
    //Convert Upload object to standard obj
    var stdObj: Object = Object.assign({}, upload)
  
    collectionRef.add(stdObj);
    console.log('File uploaded!: ' + upload.url);
    
  }


  //Fetch images Observable from firestore
  //returns: Observable<GalleryImage[]>;
  getImagesFirestore(){
    return this.db.collection('list').valueChanges();
  }


  //Fetch collection containing one image from firestore
  //return observable of that collection
  getImageFirestore(key: string){
    //Save specific image into collection
    return this.db.collection('list', ref =>{
      return ref.where('key', '==', key)
    }).valueChanges();
  }


}




  
  

