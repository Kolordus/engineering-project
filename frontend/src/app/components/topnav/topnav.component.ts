import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoService} from "../../services/user-info.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(private router: Router,
              public userInfo: UserInfoService,
              private sanitizer: DomSanitizer,
              private uploadFileService: FileUploadService) {
  }

  ngOnInit() {
    if (this.userInfo.getToken() === null || this.userInfo.getUserRole() !== 'ROLE_USER') {
      this.router.navigate(['login']);
    }
    console.log('kuuuurwas')

    this.downloadFile();
  }


  downloadFile() {
    this.uploadFileService.downloadFile().subscribe(
      res => {
        console.log(res);
        if (res.size > 0) {
          this.userInfo.image = res;
          this.userInfo.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.userInfo.image));
        }

      });
  }

  logout() {
    this.userInfo.deleteUserData();
    this.router.navigate(['login']);
  }

}
