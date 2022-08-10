import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ClaimService } from '../services/claim.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  claims: any = [];
  selectedClaim: any = {};
  closeResult = '';
  url: string = environment.url;

  constructor(private claimSvc: ClaimService, private modalSvc: NgbModal) {}

  ngOnInit(): void {
    this.getData(); // fetch data of claims
  }

  getData() {
    this.claimSvc.getClaims().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.claims = res.data;
      }
    });
  }

  setClaim(data) {
    this.selectedClaim = data;
  }

  openModal(content) {
    this.modalSvc
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  actionClaim(data) {
    this.selectedClaim.action = data;
    this.claimSvc.updateClaim(this.selectedClaim).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.getData();
      }
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  formatStatus(data: any) {
    let res: string = '';

    switch (data) {
      case 1:
        res = 'Approved';
        break;
      case 0:
        res = 'Awaiting Approval';
        break;
      case 9:
        res = 'Rejected';
    }
    return res;
  }

  formatCategory(data: any) {
    let res: string = '';

    switch (data) {
      case 1:
        res = 'Petrol Claim';
        break;
      case 2:
        res = 'Meal Claim';
        break;
      case 3:
        res = 'Office Expenses Claim';
        break;
      case 4:
        res = 'Others';
        break;
    }
    return res;
  }

  formatDept(data: any) {
    let res: string = '';

    switch (data) {
      case 1:
        res = 'HR';
        break;
      case 2:
        res = 'Finance';
        break;
      case 3:
        res = 'IT';
        break;
    }
    return res;
  }
}
