import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
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
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'URL Server',
                input: 'text',
                text: 'Please, Write the url of the server',
                inputPlaceholder: 'Example: https://dev.azure.com/TEC',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write the url server!'
                    }
                }
            },
            {
                title: 'Port Server',
                input: 'number',
                text: 'Please, Write the port of the server',
                inputPlaceholder: 'Example: 8080',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write the port!'
                    }
                }
            },
        ]).then((result) => {
            if (result.value) {
                const answers = result.value
                Swal.fire({
                    title: 'All done!',
                    html: ` Url Server:  ${answers[0]}<br>
                            Port: ${answers[1]}`,
                    confirmButtonText: 'OK!'
                })
                localStorage.setItem('URL', answers[0]);
                localStorage.setItem('PORT', answers[1]);
            }
        })
    }

    openAbout(){
        Swal.fire({
            title: 'About',
            html:`Technological Institute of Costa Rica! <br> CE-4303 Principles of Operating Systems <br> COVIC-19 <br> V.1.2 `,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }
}
