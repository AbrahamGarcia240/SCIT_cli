/*
  NAME
    new-technic.page.ts

  DESCRIPTION
    Logic to sign up a new technitian into the system.

  NOTES:
    All touched code should be documented.

    This page gets called after the technitian has successfully scanned the
    invitation QR code, loads the QR data and gets missing info either from
    the user or from system calls.

  MODIFIED   (MM/DD/YY)
  abgarcia    08/07/21 - Creation
*/

/* ------------------------------ Angular libraries ------------------------- */
import { Component, OnInit } from '@angular/core';

/* ---------------------------- Capacitor libraries ------------------------- */
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, 
         NativeGeocoderResult, 
         NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Sim } from '@ionic-native/sim/ngx';

/* ------------------------------- Ionic libaries --------------------------- */
import { AlertController } from '@ionic/angular';

/* ---------------------------- SCIT services ------------------------------- */
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-new-technic',
  templateUrl: './new-technic.page.html',
  styleUrls: ['./new-technic.page.scss'],
})

/* ----------------------------- NewTechicPage class ------------------------ */
export class NewTechnicPage implements OnInit {

  /* ----------------------------- Attributes ------------------------------- */
  // Variable to store the data of the new technician
  tech_user_data = null;
  // Variable to store the address object
  address_object = null;
  // Variable to store the sim information
  sim_data = null;

  /* ------------------------------- Methods -------------------------------- */

  //* -------------------------- constructor -------------------------------- */
  // DESCRIPTION
  //   Creates a new NewTechnicPage class
  //
  // PARAMETERS
  //   user_profile: UserProfileService (IN) - Service object to store
  //                                           data of the user of the app
  //   geolocation:         Geolocation (IN) - Geolocation object, used to get
  //                                           the address of the device
  //   nativeGeocoder:   nativeGeocoder (IN) - Translate the coordenates to a
  //                                           string
  //   sim:                       Sim   (IN) - The Sim object to get the phone
  //                                           number of the device
  //
  // RETURNS
  //   None
  //
  constructor(private user_profile: UserProfileService,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private sim: Sim) { }

  ngOnInit() { 
     // Populate the user data
     this.tech_user_data = this.user_profile.get_data();
     // Get the address of the device
     this.get_address_str();
     // Get the phone number of the device
     this.get_phone_number();
  }


  //* -------------------------- get_phone_number --------------------------- */
  // DESCRIPTION
  //   Gets the phone number of the device
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   None
  //
  // NOTES:
  //    This function populates the phone_number attribute of the class
  //
  get_phone_number() { 
    this.ask_sim_permission();    
  }

  async ask_sim_permission() { 
    // $$$TODO: handle permissions
    this.sim.requestReadPermission().then(
      () => {
        console.log('Permission granted')
        // Get the number
        this.sim.getSimInfo().then(
          (info) => {
            // If control reached this point we have the sim information
            this.sim_data = info
          },
          (err) => console.log('Unable to get sim info: ', err)
        );
      },
      () => {
        console.log('Permission denied')}
    );
  }



  //* -------------------------- get_address_str --------------------------- */
  // DESCRIPTION
  //   Gets the address of the device
  //
  // PARAMETERS
  //   None
  //
  // RETURNS
  //   A string with the address of the device
  //
   get_address_str() {
    // Define options to use when calling the native geocoder
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    // Get the coordenades of the device
    this.geolocation.getCurrentPosition().then((resp) => {
      // If control reached this point we have got coordenates.
      // Use the native geocoder to translate the coordenates into an human
      // readeable address
      var address = this.nativeGeocoder.reverseGeocode(resp.coords.latitude, 
                                         resp.coords.longitude, 
                                         options).then(
        (result: NativeGeocoderResult[]) => {
          // Once this async function is done, control should reach this point
          // with the actual list of posible addresses, pick the first one and
          // store it in the attribute of the class so that the view can
          // reference it
          this.address_object = result[0];
        }
      )
      .catch((error: any) => console.log(error));
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
}
