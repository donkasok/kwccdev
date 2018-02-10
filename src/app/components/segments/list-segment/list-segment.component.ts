import { Segment } from './../../../models/segment';
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
  selector: 'app-list-segment',
  templateUrl: './list-segment.component.html',
  styleUrls: ['./list-segment.component.css']
})
export class ListSegmentComponent implements AfterViewInit {

  itemToEdit: Segment;
  ref: AngularFirestoreCollection<Segment>;
  dbTable: Observable<Segment[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  segmentClick: EventEmitter<Segment> = new EventEmitter<Segment>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("segments", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(segments => {
        this.dbTable = this.db.colWithIds$("segments");
        this.dataSource = new MatTableDataSource(segments);
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

  delete(event, ref: Segment) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("segments/" + ref.id);
    });
  }

  edit(event, ref: Segment) {
    this.itemToEdit = ref;
    //console.log(this.itemToEdit);
    this.segmentClick.emit(ref);
  }

  ngOnInit() {}
}
