import { UploadService } from './services/upload.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { 
  MatTableModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatSortModule, 
  MatDialogModule, 
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatMenuModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatPaginatorModule,
  MatGridListModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';




import { DesignationService } from './services/designation.service';
import { FirestoreService } from './services/firestore.service';
import { SalutationService } from './services/salutation.service';

import { UppercaseDirective } from './directive/uppercase.directive';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArrowContainerComponent } from './components/arrow-container/arrow-container.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DesignationComponent } from './components/designation/designation.component';
import { AddDesignationComponent } from './components/designation/add-designation/add-designation.component';
import { ListDesignationComponent } from './components/designation/list-designation/list-designation.component';

import { SalutationComponent } from './components/salutation/salutation.component';
import { ListSalutationComponent } from './components/salutation/list-salutation/list-salutation.component';
import { AddSalutationComponent } from './components/salutation/add-salutation/add-salutation.component';
import { GenderComponent } from './components/gender/gender.component';
import { AddGenderComponent } from './components/gender/add-gender/add-gender.component';
import { ListGenderComponent } from './components/gender/list-gender/list-gender.component';
import { FollowUpTypeComponent } from './components/follow-up-type/follow-up-type.component';
import { AddFollowUpTypeComponent } from './components/follow-up-type/add-follow-up-type/add-follow-up-type.component';
import { ListFollowUpTypeComponent } from './components/follow-up-type/list-follow-up-type/list-follow-up-type.component';
import { SegmentsComponent } from './components/segments/segments.component';
import { AddSegmentComponent } from './components/segments/add-segment/add-segment.component';
import { ListSegmentComponent } from './components/segments/list-segment/list-segment.component';
import { InsuranceTypeComponent } from './components/insurance-type/insurance-type.component';
import { AddInsuranceTypeComponent } from './components/insurance-type/add-insurance-type/add-insurance-type.component';
import { ListInsuranceTypeComponent } from './components/insurance-type/list-insurance-type/list-insurance-type.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { AddToDoComponent } from './components/to-do/add-to-do/add-to-do.component';
import { ListToDoComponent } from './components/to-do/list-to-do/list-to-do.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AddCutomerComponent } from './components/customer/add-cutomer/add-cutomer.component';
import { ListCutomerComponent } from './components/customer/list-cutomer/list-cutomer.component';
import { ViewCutomerComponent } from './components/customer/view-cutomer/view-cutomer.component';
import { AddressComponent } from './components/address/address.component';
import { AddAddressComponent } from './components/address/add-address/add-address.component';
import { ListAddressComponent } from './components/address/list-address/list-address.component';
import { PolicyComponent } from './components/policy/policy.component';
import { AddPolicyComponent } from './components/policy/add-policy/add-policy.component';
import { ListPolicyComponent } from './components/policy/list-policy/list-policy.component';
import { UploadFormComponent } from './components/uploads/upload-form/upload-form.component';
import { InsurerComponent } from './components/insurer/insurer.component';
import { AddInsurerComponent } from './components/insurer/add-insurer/add-insurer.component';
import { ListInsurerComponent } from './components/insurer/list-insurer/list-insurer.component';
import { StatusComponent } from './components/status/status.component';
import { AddStatusComponent } from './components/status/add-status/add-status.component';
import { ListStatusComponent } from './components/status/list-status/list-status.component';
import { FileDropDirective } from './directive/file-drop.directive';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DesignationComponent,
    AddDesignationComponent,
    ListDesignationComponent,
    DashboardComponent,
    UppercaseDirective,
    ArrowContainerComponent,
    SideMenuComponent,
    SalutationComponent,
    ListSalutationComponent,
    AddSalutationComponent,
    GenderComponent,
    AddGenderComponent,
    ListGenderComponent,
    FollowUpTypeComponent,
    AddFollowUpTypeComponent,
    ListFollowUpTypeComponent,
    SegmentsComponent,
    AddSegmentComponent,
    ListSegmentComponent,
    InsuranceTypeComponent,
    AddInsuranceTypeComponent,
    ListInsuranceTypeComponent,
    ToDoComponent,
    AddToDoComponent,
    ListToDoComponent,
    CustomerComponent,
    AddCutomerComponent,
    ListCutomerComponent,
    ViewCutomerComponent,
    AddressComponent,
    AddAddressComponent,
    ListAddressComponent,
    PolicyComponent,
    AddPolicyComponent,
    ListPolicyComponent,
    UploadFormComponent,
    InsurerComponent,
    AddInsurerComponent,
    ListInsurerComponent,
    StatusComponent,
    AddStatusComponent,
    ListStatusComponent,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatGridListModule,
    MatExpansionModule,
    SatPopoverModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSelectModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'arrowApp'),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forRoot([
      {path:'', component: AppComponent},
      {path:'dashboard', component: DashboardComponent},
      {path:'designation', component: DesignationComponent},
      {path:'salutation', component: SalutationComponent},
      {path:'gender', component: GenderComponent},
      {path:'follow-up', component: FollowUpTypeComponent},
      {path:'segment', component: SegmentsComponent},
      {path:'insurance-type', component: InsuranceTypeComponent},
      {path:'to-do', component: ToDoComponent},
      {path:'customer-details/:id', component: ViewCutomerComponent},
      {path:'customer', component: CustomerComponent},
      {path:'address', component: AddressComponent},
      {path:'policy', component: PolicyComponent},
      {path:'insurer', component: InsurerComponent},
      {path:'status', component: StatusComponent},
      {path:'upload', component: UploadFormComponent}
    ])
  ],
  
  entryComponents: [],
  providers: [
    DesignationService,
    SalutationService,
    FirestoreService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
