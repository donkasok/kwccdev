import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Designation } from './../models/designation';
//import 'rxjs/add/operator/map';

@Injectable()
export class DesignationService {

  designationCollection:AngularFirestoreCollection<Designation>;
  designation: Observable<Designation[]>;
  designationDoc: AngularFirestoreDocument<Designation>;

  
  

  constructor(public afs: AngularFirestore) {

    this.designationCollection = this.afs.collection('designations', ref => ref.orderBy('name', 'asc'));

    this.designation = this.designationCollection.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as Designation;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }) ;


  }

  getDesignation(){
    return this.designation;
  }

  addDesignation(designation:Designation){
    this.designationCollection.add(designation);
  }

  
  deleteDesignation(designation: Designation){
    this.designationDoc = this.afs.doc(`designations/${designation.id}`);
    this.designationDoc.delete().then( a =>{
      return (this.designation);
    })
  }
  
  updateDesignation(designation: Designation){
    this.designationDoc = this.afs.doc(`designations/${designation.id}`);
    this.designationDoc.update(designation);
    this.designationDoc.update(designation).then( a=>{
      return(this.designation);
    })
  }


}
