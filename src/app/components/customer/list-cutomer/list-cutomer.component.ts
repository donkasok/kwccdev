import { Customer } from './../../../models/customer';
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
  selector: 'app-list-cutomer',
  templateUrl: './list-cutomer.component.html',
  styleUrls: ['./list-cutomer.component.css']
})
export class ListCutomerComponent implements AfterViewInit {

  itemToView: Customer; 
  @Output()
  viewCustomerClick: EventEmitter<Customer> = new EventEmitter<Customer>();

  ref: AngularFirestoreCollection<Customer>;
  dbTable: Observable<Customer[]>; //db

  displayedColumns = ["FirstName","LastName", "Email", "Tel",  "Mob", "View", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("customers", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(customers => {
        this.dbTable = this.db.colWithIds$("customers");
        this.dataSource = new MatTableDataSource(customers);
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

  deleteCustomer(event, ref: Customer) {
    //console.log(ref);
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("customers/" + ref.id);
    });
  }

  viewCustomer(event, ref: Customer) {
    this.itemToView = ref;
    //console.log(this.itemToView);
    //console.log(ref);
    this.viewCustomerClick.emit(ref);
    //console.log(this.viewCustomerClick.emit(ref))
  }

}
