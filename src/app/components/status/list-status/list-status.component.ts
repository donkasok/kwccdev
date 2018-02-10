import { Status } from './../../../models/status';
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
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.css']
})
export class ListStatusComponent implements AfterViewInit {

  itemToEdit: Status;
  ref: AngularFirestoreCollection<Status>;
  dbTable: Observable<Status[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  statusClick: EventEmitter<Status> = new EventEmitter<Status>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("status", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(status => {
        this.dbTable = this.db.colWithIds$("statuss");
        this.dataSource = new MatTableDataSource(status);
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

  delete(event, ref: Status) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("status/" + ref.id);
    });
  }

  edit(event, ref: Status) {
    this.itemToEdit = ref;
    //console.log(this.itemToEdit);
    this.statusClick.emit(ref);
  }

  ngOnInit() {}
}
