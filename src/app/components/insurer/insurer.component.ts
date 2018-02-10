import { Insurer } from './../../models/insurer';

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
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.css']
})
export class InsurerComponent implements OnInit {

  addState: boolean = true;
  checker;

  editForm = new FormGroup({
    insurerField: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  getErrorMessage() {
    return this.editForm.get("insurerField").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("insurerField").hasError("minlength")
        ? "Min 2 letters"
          : "";
  }

  constructor(public editSnackBar: MatSnackBar, public db: FirestoreService) {}

  showFromParent = function(insurer: Insurer) {
    this.insurer = insurer;
    this.addState = false;
  };

  check($event) {
    let q = $event.target.value;
    let response = this.db
      .checkExist$("insurers", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.checker = true;
        } else {
          this.checker = false;
        }
      });
  }

  update(ref: Insurer) {
    this.db.update("insurers/" + ref.id, ref).then(() => {
      this.editSnackBar.open("Updated", "Ok", { duration: 3000 });
      this.addState = true;
    });
  }

  ngOnInit() {}
}
