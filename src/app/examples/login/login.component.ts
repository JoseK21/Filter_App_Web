import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'

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

    constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }



    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
    }

    preview() {
        // Show preview 
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        }
    }

    onSubmit() {

        /** spinner starts on init */
        this.spinner.show();

        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            this.showFilters = true;
        }, 5000);

        return 0;
        const formData = new FormData();
        formData.append('file', this.fileData);
        this.http.post('url/to/your/api', formData)
            .subscribe(res => {
                console.log(res);
                /* this.uploadedFilePath = res['data'].filePath; */
                this.uploadedFilePath = res['data']['filePath'];
                alert('SUCCESS !!');
            })
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
}
