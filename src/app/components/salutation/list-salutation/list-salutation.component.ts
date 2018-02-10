import { Salutation } from './../../../models/salutation';
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
  selector: 'app-list-salutation',
  templateUrl: './list-salutation.component.html',
  styleUrls: ['./list-salutation.component.css']
})
export class ListSalutationComponent implements AfterViewInit {

  itemToEdit: Salutation;
  ref: AngularFirestoreCollection<Salutation>;
  dbTable: Observable<Salutation[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  salutationClick: EventEmitter<Salutation> = new EventEmitter<Salutation>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("salutations", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(salutations => {
        this.dbTable = this.db.colWithIds$("salutations");
        this.dataSource = new MatTableDataSource(salutations);
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

  delete(event, ref: Salutation) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("salutations/" + ref.id);
    });
  }

  edit(event, ref: Salutation) {
    this.itemToEdit = ref;
    //console.log(this.itemToEdit);
    this.salutationClick.emit(ref);
  }

  ngOnInit() {}
}
