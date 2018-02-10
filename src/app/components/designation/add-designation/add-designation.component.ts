import { CustomformValidators } from "./../../../shared/customform.validator";
import { UppercaseDirective} from "./../../../directive/uppercase.directive";
import { Designation } from "./../../../models/designation";
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
  selector: "app-add-designation",
  templateUrl: "./add-designation.component.html",
  styleUrls: ["./add-designation.component.css"]
})
export class AddDesignationComponent implements OnInit {
  designation: Designation = {
    name: ""
  };
  ref: AngularFirestoreCollection<Designation>;
  designations: Observable<Designation[]>; //db
  dbTable: Observable<Designation[]>; //db
  singleCollum: AngularFirestoreCollection<Designation>;
  designationCheker;
  designationChekerMsg = false;

  form = new FormGroup({
    designationField: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      CustomformValidators.cannotContainSpace
    ])
  });

  getErrorMessage() {
    return this.form.get("designationField").hasError("required")
      ? "You must enter a value"
      : this.form.get("designationField").hasError("minlength")
        ? "Min 3 letters"
        : this.form.get("designationField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }
  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {}
  ngOnInit() {}

  

  checkDesignation($event) {
    let q = $event.target.value;
    //console.log(q);
    let response = this.db
      .checkExist$("designations", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.designationCheker = true;
        } else {
          this.designationCheker = false;
        }
      });
  }
  onSubmit() {
    
    this.db.add("designations", this.designation).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.designation.name = "";
    });
    this.form.reset();
  }

  // resetForm() {
  //   console.log("Hi reset");
  // }
  
}
