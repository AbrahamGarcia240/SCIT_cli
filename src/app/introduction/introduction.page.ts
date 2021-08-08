/*
  NAME
    introduction.page.ts

  DESCRIPTION
    Logic to display the introduction.

  NOTES:
    All touched code should be documented.

    Once the introduction is done, this page classifies the users by either
    manager or technitian. If manager, we send the manager to the register page
    without any information. If technitian we will trigger the QR scanner
    to retrieve the provided information.

  MODIFIED   (MM/DD/YY)
  abgarcia    08/07/21 - Creation
*/

/* ------------------------------ Angular libraries ------------------------- */
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

/* ------------------------------- Ionic libaries --------------------------- */
import { IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

/* ----------------------------- Capacitor libaries ------------------------- */
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})


/* ----------------------------- IntroductionPage class --------------------- */
export class IntroductionPage implements OnInit {
  /* ----------------------------- Attributes ------------------------------- */
  // IonSlides object to iterate over the slides
  @ViewChild(IonSlides) slides: IonSlides;

  /* ------------------------------- Methods -------------------------------- */

  //* -------------------------- constructor -------------------------------- */
  // DESCRIPTION
  //   Creates a new IntroductionPage class
  //
  // PARAMETERS
  //   router:  Router (IN) - Router class to move in between pages
  //
  // RETURNS
  //   None
  //
  constructor(private router: Router) { }

  /* -------------------------- next_slide ---------------------------------- */
  // DESCRIPTION
  //   Programatically goes to the next slide if available
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   None
  //
  next_slide() {
    this.slides.slideNext();
  }

  /* -------------------------- open_qr_page -------------------------------- */
  // DESCRIPTION
  //   Wrapper function to call the QR page
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   None
  //
  open_qr_page() {
    this.router.navigate(['/qr-scanner']);
  }

  ngOnInit() {
  }
}
