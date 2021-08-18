/*
  NAME
    qr-scanner.page.ts

  DESCRIPTION
    Logic to scann a QR code

  NOTES:
    All touched code should be documented.

    This module scans a QR code and gets its object content.
    This module expects the QR code to return an object

  MODIFIED   (MM/DD/YY)
  abgarcia    08/07/21 - Creation
*/

/* ------------------------------ Angular libraries ------------------------- */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* ------------------------------- Ionic libaries --------------------------- */
import { AlertController } from '@ionic/angular';

/* ----------------------------- Capacitor libaries ------------------------- */
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

/* ---------------------------- SCIT services ------------------------------- */
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})

/* ----------------------------- QrScannerPage class ------------------------ */
export class QrScannerPage implements OnInit {

  /* ----------------------------- Attributes ------------------------------- */
  // Variable to keep track of the scanner status
  scan_active = false;
  // Variable to store the scanned object
  scanned_object = null;


  /* ------------------------------- Methods -------------------------------- */

  //* -------------------------- constructor -------------------------------- */
  // DESCRIPTION
  //   Creates a new QrScannerPage class
  //
  // PARAMETERS
  //   alertController: AlertController (IN) - Class to prompt alerts to the
  //                                           user
  //   router:                   Router (IN) - Router class to move in
  //                                           between pages
  //   user_profile: UserProfileService (IN) - Service object to store
  //                                           data of the user of the app
  //
  // RETURNS
  //   None
  //
  constructor(public alertController: AlertController,
              private router: Router,
              private user_profile: UserProfileService) { }

  //* ----------------------------- ngOnInit -------------------------------- */
  // DESCRIPTION
  //   Method that gets executed when this page is compiled and shown to
  //   the user
  //
  // PARAMETERS
  //   None
  //
  // NOTES
  //    This funtion is a wrappert to asynchronously call ask_user_qr.
  //    We do this as we cannot call async functions in ngOnInit due to
  //    Typescript constraints
  //
  // RETURNS
  //   None
  //
  ngOnInit() { 
    this.ask_user_qr();
  }

  //* -------------------------- ask_user_qr -------------------------------- */
  // DESCRIPTION
  //   Prompts the user asking him to locate the QR code to scan
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   None
  //
  // NOTES
  //    $$$TODO: Consider moving this logic as this module should be only a
  //             QR scanner regardless of who calls it
  //
  async ask_user_qr() {
    // Before starting the scanner notify the user that he will need to scan
    // the QR that he might have received via email
    var msg = 
      `If your manager invited you to SCIT, you might have received
       an email with a QR code, you will need to scan it to start.`;
    // Create a new alert object to promt the user
    const alert = await this.alertController.create({
      header: 'Scan invitation',
      message: msg,
      buttons: [{
        // Button to cancel the action, if clicked we should go back to
        // thee introduction page
        text: 'Cancel',
        handler: () => {
          this.router.navigate(['/introduction']);
        }
      },
      {
        // Button to carry on, if clicked we should start the QR code scanner
        text: 'Open scanner',
        handler: () => {
          // Call the method to scann
          this.scan();
        }
      }]
    });

    // If control reached this point we have created the alert object, now
    // we should display it to the user
    await alert.present();
  }

  //* ------------------------------- scan ---------------------------------- */
  // DESCRIPTION
  //   Triggers the camera to scan either a QR code or a barcode
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   None
  //
  // NOTES
  //   This API will first ask for camera permissions
  //
  async scan() {
    // Ask for permissions to get to the camera in order to get the QR code
    await this.check_permission();

    // If control reached this point we can go ahead and scan the bar code
    this.scan_active = true;
    const result = await BarcodeScanner.startScan();
    // Get the data scanned
    if (result.hasContent) {
      var parsed_content = JSON.parse(result.content);
      // The result.content is a JSON shaped string, we need to parse it
      // to be a JSON object
      this.user_profile.set_data(parsed_content);
      // Set the scanner active to false
      this.scan_active = false;
      this.router.navigate(['/new-technic']);
      
    }
  }

  //* -------------------------- check_permission --------------------------- */
  // DESCRIPTION
  //   Ask the OS for camera permissions
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   A promise solving True if the user granted camera permissions,
  //   solves False otherwise
  //
  async check_permission() {
    return new Promise(async(resolve, reject) => {
      // Use the BarcodeScanner object's method to get permissions
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // If control reached this point we have permissions
        resolve(true);
      }
      else if (status.denied) {
        // If control reached this point we have no permissions to access
        // the camera, raise an alert to the user to inform him to grant
        // camera permissions
        const alert = await this.alertController.create({
          header: 'No camera permission',
          message: 'Please allow camera access in the phone settings',
          buttons: [{
            // Button to cancel
            text: 'Cancel',
            role: 'cancel'
          },
          {
            // Button to open OS settings
            text: 'Open settings',
            handler: () => {
              // This function opens the settings so that the user can enable
              // the camera permissions for this app
              BarcodeScanner.openAppSettings();
              resolve(false);
            }
          }]
        });
      }
      else {
        // If control reached this point, the user has not granted camera
        // access
        resolve(false);
      }
    })
  }

  //* ----------------------------- ngOnDestroy ----------------------------- */
  // DESCRIPTION
  //   Method that gets executed once this page is closed
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   None
  //
  //  NOTES
  //    This method will force the scanner to stop.
  //
  ngOnDestroy() {
    this.scan_active = false;
    BarcodeScanner.stopScan();
  }

}
