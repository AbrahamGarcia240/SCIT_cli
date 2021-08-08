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

  /* ------------------------------- Methods -------------------------------- */

  //* -------------------------- constructor -------------------------------- */
  // DESCRIPTION
  //   Creates a new NewTechnicPage class
  //
  // PARAMETERS
  //   user_profile: UserProfileService (IN) - Service object to store
  //                                           data of the user of the app
  //
  // RETURNS
  //   None
  //
  constructor(private user_profile: UserProfileService) { 
   
  }

  ngOnInit() {
     // Populate the user data
     this.tech_user_data = this.user_profile.get_data();
     console.log("🚀 ~ file: new-technic.page.ts ~ line 58 ~ NewTechnicPage ~ ngOnInit ~ tech_user_data", this.tech_user_data)
  }

}
