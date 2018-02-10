import { Policy } from './../../../models/policy';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { Observable } from "rxjs/Observable";
import { FirestoreService } from "./../../../services/firestore.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-list-policy',
  templateUrl: './list-policy.component.html',
  styleUrls: ['./list-policy.component.css']
})
export class ListPolicyComponent implements AfterViewInit {

  itemToEdit: Policy;
  ref: AngularFirestoreCollection<Policy>;
  dbTable: Observable<Policy[]>; //db

  displayedColumns = ["policyNo", "Type", "Insurer", "Premium", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  policyClick: EventEmitter<Policy> = new EventEmitter<Policy>();
  @Input() customerId: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  // checkUserID() {
  //   console.log("Customer ID on List" + this.customerId);
  // }

  ngAfterViewInit() {
    let q = this.customerId;
    this.db
      //.colWithIds$("addresses", ref => ref.where("userId", "==", q).orderBy("createdAt", "desc"))
      .colWithIds$("policies", ref => ref.where("userId", "==", q).orderBy("createdAt", "desc"))
      .subscribe(policies => {
        this.dbTable = this.db.colWithIds$("policies");
        this.dataSource = new MatTableDataSource(policies);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(index, item) {
    return item.uid;
  }

  delete(event, ref: Policy) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("policies/" + ref.id);
    });
  }

  edit(event, ref: Policy) {
    this.itemToEdit = ref;
    console.log(this.itemToEdit);
    this.policyClick.emit(ref);
  }

  ngOnInit() {}
}