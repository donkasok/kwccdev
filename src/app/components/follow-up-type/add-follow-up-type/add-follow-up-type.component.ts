import { FollowUpType } from './../../../models/follow-up-type';
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
  selector: 'app-add-follow-up-type',
  templateUrl: './add-follow-up-type.component.html',
  styleUrls: ['./add-follow-up-type.component.css']
})
export class AddFollowUpTypeComponent implements OnInit {

  followUpType: FollowUpType = {
    name: ""
  };

  ref: AngularFirestoreCollection<FollowUpType>;
  followUpTypes: Observable<FollowUpType[]>; //db
  dbTable: Observable<FollowUpType[]>; //db
  singleCollum: AngularFirestoreCollection<FollowUpType>;
  cheker;
  chekerMsg = false;

  form = new FormGroup({
    followUpTypeField: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      CustomformValidators.cannotContainSpace
    ])
  });

  getErrorMessage() {
    return this.form.get("followUpTypeField").hasError("required")
      ? "You must enter a value"
      : this.form.get("followUpTypeField").hasError("minlength")
        ? "Min 2 letters"
        : this.form.get("followUpTypeField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }
  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {}
  ngOnInit() {}

  

  checkEvent($event) {
    let q = $event.target.value;
    //console.log(q);
    let response = this.db
      .checkExist$("follow-up-types", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.cheker = true;
        } else {
          this.cheker = false;
        }
      });
  }
  onSubmit() {
    
    this.db.add("follow-up-types", this.followUpType).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      
    });
    this.form.reset();
  }

  // resetForm() {
  //   console.log("Hi reset");
  // }
  
}
