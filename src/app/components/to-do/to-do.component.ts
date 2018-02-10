import { FollowUpType } from './../../models/follow-up-type';
import { ToDo } from './../../models/to-do';
import { FirestoreService } from "./../../services/firestore.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Component, OnInit, Input } from "@angular/core";
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
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  @Input()
  customerId: string = "";
  followUpTypes:Observable<FollowUpType[]>;
   addState: boolean = true;

  editForm = new FormGroup({
    taskField: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]),
    dateField: new FormControl("", []),
    followUpField: new FormControl("", [])
  });

  getErrorMessage() {
    return this.editForm.get("taskField").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("taskField").hasError("minlength")
        ? "Min 2 letters"
          : "";
  }

  constructor(public editSnackBar: MatSnackBar, public db: FirestoreService) { 
    this.followUpTypes = this.db.colWithIds$("follow-up-types", ref => ref.orderBy("name", "desc"));
  }

  ngOnInit() {}

  showFromParent = function(task: ToDo) {
    this.task = task;
    this.addState = false;
  };

  update(ref: ToDo) {
    this.db.update("to-dos/" + ref.id, ref).then(() => {
      this.editSnackBar.open("Updated", "Ok", { duration: 3000 });
      this.addState = true;
    });
  }


}
