import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClaimService } from '../services/claim.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss'],
})
export class ClaimComponent implements OnInit {
  params: any;
  url: string = environment.url;
  formData: any = {};
  attachment: any = null;
  searchTerm: string = '';
  nameValidation: string = '';
  deptValidation: string = '';
  catValidation: string = '';
  valueValidation: string = '';
  fileValidation: string = '';
  validated: any;

  constructor(
    private route: ActivatedRoute,
    private claimSvc: ClaimService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get current route param
    this.route.params.subscribe((parameter) => {
      this.params = parameter;
    });
  }

  validation() {
    // any number validation or other format can be improved
    this.validated = [];
    if (this.formData.name != null) {
      this.nameValidation = 'is-valid';
    } else {
      this.nameValidation = 'is-invalid';
      this.validated.push('invalid');
    }
    if (this.formData.department != null) {
      this.deptValidation = 'is-valid';
    } else {
      this.deptValidation = 'is-invalid';
      this.validated.push('invalid');
    }
    if (this.formData.category != null) {
      this.catValidation = 'is-valid';
    } else {
      this.catValidation = 'is-invalid';
      this.validated.push('invalid');
    }
    if (this.formData.value != null) {
      this.valueValidation = 'is-valid';
    } else {
      this.valueValidation = 'is-invalid';
      this.validated.push('invalid');
    }
    if (this.attachment != null) {
      this.fileValidation = 'is-valid';
    } else {
      this.fileValidation = 'is-invalid';
      this.validated.push('invalid');
    }
  }

  attachmentHandler(event: any) {
    this.attachment = event.target.files.item(0);
    console.log(this.attachment);
  }

  submitForm() {
    this.validation();
    if (this.validated.length > 0) {
      console.log('There is invalid data.');
    } else {
      const claimData = new FormData();
      claimData.append('file', this.attachment, this.attachment.name);
      console.log(claimData);
      this.claimSvc.storeAttachment(claimData).subscribe((res) => {
        if (res.message === 'SUCCESS') {
          console.log(res.data);
          this.formData.filepath = res.data.path;
          this.formData.file_id = res.data.id;
          this.claimSvc.storeClaim(this.formData).subscribe((res) => {
            if (res.message === 'SUCCESS') {
              this.router.navigate(['/']);
            }
          });
        }
      });
    }
  }
}
