import { FollowUpType } from './../../../models/follow-up-type';
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

@Component({
  selector: 'app-list-follow-up-type',
  templateUrl: './list-follow-up-type.component.html',
  styleUrls: ['./list-follow-up-type.component.css']
})
export class ListFollowUpTypeComponent implements AfterViewInit {

  itemToEdit: FollowUpType;
  ref: AngularFirestoreCollection<FollowUpType>;
  dbTable: Observable<FollowUpType[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  followUpTypeClick: EventEmitter<FollowUpType> = new EventEmitter<FollowUpType>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("follow-up-types", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(followUpTypes => {
        this.dbTable = this.db.colWithIds$("follow-up-types");
        this.dataSource = new MatTableDataSource(followUpTypes);
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

  delete(event, ref: FollowUpType) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("follow-up-types/" + ref.id);
    });
  }

  edit(event, ref: FollowUpType) {
    this.itemToEdit = ref;
    console.log(this.itemToEdit);
    this.followUpTypeClick.emit(ref);
  }

  ngOnInit() {}
}
