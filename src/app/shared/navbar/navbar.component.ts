import { Component, OnInit, ElementRef } from '@angular/core';
import { Location} from '@angular/common';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(public location: Location, private element: ElementRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    openSettings() {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Continuar &rarr;',
            showCancelButton: true,
        }).queue([            
            {
                title: 'Url Api',
                inputPlaceholder: 'Ejemplo: http://ejemplo.com:9000/api',
                inputValidator: (value) => {
                    if (!value) { return 'Ingrese la url del api!' }
                }
            }      
        ]).then((result) => {
            if (result.value) {                
                localStorage.setItem('url_api', result.value[0]);

                Swal.fire({
                    icon: 'success',
                    title: 'Configuración Exitosa!',
                    text: result.value[0],
                  })
            }
        })
    }
}
