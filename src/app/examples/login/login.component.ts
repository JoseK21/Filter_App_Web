import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
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

    constructor(private http: HttpClient, private spinner: NgxSpinnerService, private webSocketService: WebServiceService) { }

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
        /* this.change()  */
        this.preview()
    }


    preview() {
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
            this.previewUrl_bool = false;

            /* this.test(this.previewUrl, this.fileData.size); */
        }
    }

    /**
     * change
     */
    public change() {
        /* document.querySelector('input').addEventListener('change', function () { */

        var reader = new FileReader();
        reader.onload = function () {

            var arrayBuffer = this.result,
                array = new Uint8Array(arrayBuffer as ArrayBuffer),
                binaryString = String.fromCharCode.apply(null, array);

            console.log(binaryString);

        }
        reader.readAsArrayBuffer(this.fileData);

        /* }, false); */

    }

    onSubmit() {
        /** spinner starts on init */
        this.spinner.show();
        this.test(this.previewUrl, this.fileData.size);
        setTimeout(() => {
            this.spinner.hide();
            this.showFilters = true;
            alert(localStorage.getItem('url_api'))
        }, 2000);
    }

    test(base64StringFromURL, size) {
        var parts = base64StringFromURL.split(";base64,");
        var base64 = parts[1];
        var byteArray = this.base64ToByteArray(base64, size);
        let a = []

        for (var key in byteArray[0]) { a.push(byteArray[0][key]) }

        var binaryString = String.fromCharCode.apply(null, a);
        this.webSocketService.send_info(binaryString)
    }

    base64ToByteArray(base64String, size) {
        try {
            var sliceSize = size; /* 1024 */
            var byteCharacters = atob(base64String);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return byteArrays;
        } catch (e) {
            console.log("Couldn't convert to byte array: " + e);
            return undefined;
        }
    }
}



