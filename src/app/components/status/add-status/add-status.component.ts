import { Status } from './../../../models/status';
import { UppercaseDirective } from './../../../directive/uppercase.directive';
import { CustomformValidators } from './../../../shared/customform.validator';
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs/Observable";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { FirestoreService } from "./../../../services/firestore.service";
import {
  FormGroup,
  FormControl,
  Validators,
  NgControlStatus
} from "@angular/forms";

import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";
import { empty } from "rxjs/Observer";

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent implements OnInit {

  policyStatus: Status = {
    name: ""
  };

  ref: AngularFirestoreCollection<Status>;
  policyStatuss: Observable<Status[]>; //db
  dbTable: Observable<Status[]>; //db
  singleCollum: AngularFirestoreCollection<Status>;
  cheker;
  chekerMsg = false;

  form = new FormGroup({
    policyStatusField: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  
  getErrorMessage() {
    return this.form.get("policyStatusField").hasError("required")
      ? "You must enter a value"
      : this.form.get("policyStatusField").hasError("minlength")
        ? "Min 2 letters"
          : "";
  }
  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {}
  ngOnInit() {}

  

  checkEvent($event) {
    let q = $event.target.value;
    //console.log(q);
    let response = this.db
      .checkExist$("status", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.cheker = true;
        } else {
          this.cheker = false;
        }
      });
  }
  onSubmit() {
    
    this.db.add("status", this.policyStatus).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.policyStatus.name = "";
      //this.form.$setPristine(true);
    });
    this.form.reset();
  }

  // resetForm() {
  //   console.log("Hi reset");
  // }
  
}