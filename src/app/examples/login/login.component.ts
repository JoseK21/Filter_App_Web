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
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    showFilters: boolean = false;

    constructor(private http: HttpClient, private spinner: NgxSpinnerService, private webSocketService: WebServiceService) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');


        this.webSocketService.listen('test event').subscribe((data) => {
            console.log(data);
        })
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }



    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.webSocketService.send_info(this.fileData.size)
        this.preview(this.fileData.size);
    }

    preview(size) {
        // Show preview 
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
            this.test(this.previewUrl, size);
        }
    }



    onSubmit() {
        /** spinner starts on init */
        this.spinner.show();
        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            this.showFilters = true;
            alert(localStorage.getItem('url_api'))
        }, 5000);
    }

    /* Save Image in Local File */
    showFilter1() {
        Swal.fire({
            title: 'Filtro Media!',
            imageUrl: 'https://unsplash.it/400/400',
            imageHeight: 300,
            imageAlt: 'Cargando..',
        })
    }

    showFilter2() {
        Swal.fire({
            title: 'Filtro Mediana!',
            imageUrl: 'https://unsplash.it/300/400',
            imageHeight: 300,
            imageAlt: 'Cargando..',
        })
    }


    test(base64StringFromURL, size) {
        var parts = base64StringFromURL.split(";base64,");
        var base64 = parts[1];
        var byteArray = this.base64ToByteArray(base64, size);
        console.log(typeof byteArray);

        let a = []
        for (var key in byteArray[0]) {
            a.push(byteArray[0][key])
        }
        this.webSocketService.send_info(a)
        /* this.webSocketService.send_info(byteArray) */
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



