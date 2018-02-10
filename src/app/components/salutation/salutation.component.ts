import { Salutation } from './../../models/salutation';
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
  selector: 'app-salutation',
  templateUrl: './salutation.component.html',
  styleUrls: ['./salutation.component.css']
})
export class SalutationComponent implements OnInit {

  addState: boolean = true;
  checker;

  editForm = new FormGroup({
    salutationField: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      CustomformValidators.cannotContainSpace
    ])
  });

  getErrorMessage() {
    return this.editForm.get("salutationField").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("salutationField").hasError("minlength")
        ? "Min 2 letters"
        : this.editForm.get("salutationField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }

  constructor(public editSnackBar: MatSnackBar, public db: FirestoreService) {}

  showFromParent = function(salutation: Salutation) {
    this.salutation = salutation;
    this.addState = false;
  };

  check($event) {
    let q = $event.target.value;
    let response = this.db
      .checkExist$("salutations", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.checker = true;
        } else {
          this.checker = false;
        }
      });
  }

  update(ref: Salutation) {
    this.db.update("salutations/" + ref.id, ref).then(() => {
      this.editSnackBar.open("Updated", "Ok", { duration: 3000 });
      this.addState = true;
    });
  }

  ngOnInit() {}
}