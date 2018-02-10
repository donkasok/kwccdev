import { Designation } from "./../../models/designation";
import { FirestoreService } from "./../../services/firestore.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs/Observable";
import {
  FormGroup,
  FormControl,
  Validators,
  NgControlStatus
} from "@angular/forms";
import { CustomformValidators } from "./../../shared/customform.validator";

import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";
import { empty } from "rxjs/Observer";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"]
})
export class DesignationComponent implements OnInit {
  addState: boolean = true;
  editdesignationCheker;

  editForm = new FormGroup({
    designationField: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      CustomformValidators.cannotContainSpace
    ])
  });

  getErrorMessage() {
    return this.editForm.get("designationField").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("designationField").hasError("minlength")
        ? "Min 3 letters"
        : this.editForm.get("designationField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }

  constructor(public editSnackBar: MatSnackBar, public db: FirestoreService) {}

  showDesignationFromParent = function(designation: Designation) {
    this.designation = designation;
    this.addState = false;
  };

  checkDesignation($event) {
    let q = $event.target.value;
    let response = this.db
      .checkExist$("designations", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.editdesignationCheker = true;
        } else {
          this.editdesignationCheker = false;
        }
      });
  }

  updateDesignation(ref: Designation) {
    this.db.update("designations/" + ref.id, ref).then(() => {
      this.editSnackBar.open("Updated", "Ok", { duration: 3000 });
      this.addState = true;
    });
  }

  ngOnInit() {}
}
