import { FollowUpType } from './../../../models/follow-up-type';
import { ToDo } from './../../../models/to-do';
import { UppercaseDirective } from './../../../directive/uppercase.directive';
import { CustomformValidators } from './../../../shared/customform.validator';
import { Component, OnInit, Input } from "@angular/core";
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
  selector: "app-add-to-do",
  templateUrl: "./add-to-do.component.html",
  styleUrls: ["./add-to-do.component.css"]
})
export class AddToDoComponent implements OnInit {
  @Input() customerId: string = "";
  followUpTypes: Observable<FollowUpType[]>;

  task: ToDo = {
    name: "",
    status: true,
    date: "",
    userId: "",
    followUpId: ""
  };

  date = new FormControl(new Date());

  form = new FormGroup({
    taskField: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]),
    dateField: new FormControl("", []),
    followUpField: new FormControl("", [])
  });

  getErrorMessage() {
    return this.form.get("taskField").hasError("required")
      ? "You must enter a value"
      : this.form.get("taskField").hasError("minlength") ? "Min 2 letters" : "";
  }

  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {
    this.followUpTypes = this.db.colWithIds$("follow-up-types", ref =>
      ref.orderBy("name", "desc")
    );
  }
  ngOnInit() {}

  onSubmit() {
    this.task.status = true;
    this.task.userId = this.customerId;
    //console.log(this.task);
    this.db.add("to-dos", this.task).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.task.name = "";
      this.task.date = "";
    });
    this.form.reset();
  }
}
