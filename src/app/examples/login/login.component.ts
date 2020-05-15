import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { WebServiceService } from 'app/web-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data: Date = new Date();
    focus;
    focus1;
    fileData: File = null;
    previewUrl: any = null;
    previewUrl_bool: boolean = true;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;
    showFilters: boolean = false;

    constructor(private spinner: NgxSpinnerService, private webSocketService: WebServiceService) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        this.webSocketService.listen('test event').subscribe((data) => { console.log(data); })
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview(this.fileData.size)
    }

    preview(size) {
        this.onSubmit()
        if (this.fileData.type.match(/image\/*/) == null) { return }
        var reader = new FileReader();

        reader.readAsDataURL(this.fileData);
        reader.onload = (e) => {
            this.previewUrl = e.target.result;
            let json = {
                size: size,
                image: this._base64ToArrayBuffer(e.target.result)
            }
            this.webSocketService.send_info(json);
        }
    }

    public _base64ToArrayBuffer(base64) {
        var parts = base64.split(";base64,");
        var base64_ = parts[1];
        var binary_string = window.atob(base64_);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) { bytes[i] = binary_string.charCodeAt(i) }
        return bytes.buffer;
    }

    onSubmit() {
        this.spinner.show();
        /* this.test(this.previewUrl, this.fileData.size); */
        setTimeout(() => {
            this.spinner.hide();
            this.showFilters = true;
        }, 2000);
    }
}