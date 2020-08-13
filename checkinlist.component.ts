import { Component, ViewChild, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";
import { Checkindata } from "../services/checkinlist";
import { DataTableDirective } from "angular-datatables";
import { LetestBooking } from "../services/latestUpdatesList";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
@Component({
  selector: "app-checkinlist",
  templateUrl: "./checkinlist.component.html",
  styleUrls: ["./checkinlist.component.css"],
})
export class CheckinlistComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtElement: DataTableDirective;
  @ViewChild(DataTableDirective)
  dtTrigger: Subject<LetestBooking> = new Subject();
  showRegisterPassword: boolean; // hide/show the register password
  showVerifyPassword: boolean; // hide/show the verify password
  passwordVerificaion: boolean; // check the register and verify password same or not
  display_verification_popup = "none";
  display_smscode_popup = "none";
  isdataEntered: boolean; // check for all the data is entered or not
  isemailIdValid: boolean; // check for the email id validation
  display_error_popup = "none"; // show/hide error popup
  member_Data: any; // holds the register request data
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; //email id pattern
  id: any; // holds the user Id

  loading = false; // waiting image
  postUrl: any; // hold the register url
  postResult: any = {}; // hold the register response data
  verificationData: any;
  checkindata: Checkindata;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UserService,
    private spinner: NgxSpinnerService,
    private api: ApiService // private customers: JwtService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);
    this.api
      .getcheckindetails()
      .subscribe((data: any) => (this.checkindata = data));
    console.log(JSON.stringify(this.checkindata));
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      processing: false,
    };
    this.rerender();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
