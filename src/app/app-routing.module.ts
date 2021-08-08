// Copyright (c) 2021, SCIT. All rights reserved
/*
  NAME
    app-routing.module.ts

  DESCRIPTION
    This module defines the available routes inside the SCIT CLI app

  NOTES:
    List of available pages, keep them ordered chronologically:

      '':           When no page is specified in the path
      home:         Landing page
      introduction: Welcomes the user and gives a quick tutorial
      qr-scanner:   Page to access the QR scanner
      new-technic:  To set up a new technic once we get the data scanned
                    from the QR code

  MODIFIED   (MM/DD/YY)
  abgarcia    08/07/21 - Creation
*/

/* ---------------------------- Angular modules ----------------------------- */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // When no page is specified in the path
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full'
  },
  {
    // Landing page
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    // This page gives a tutorial to the user, should be displayed only
    // if this is the first time the user access the application
    path: 'introduction',
    loadChildren: () => import('./introduction/introduction.module').then(
      m => m.IntroductionPageModule)
  },
  {
    // Blank page in which the camera gets displayed to the user so that he
    // can scan a QR code
    path: 'qr-scanner',
    loadChildren: () => import('./qr-scanner/qr-scanner.module').then( 
      m => m.QrScannerPageModule)
  },
  {
    // Form to add a nw technitian into the system
    path: 'new-technic',
    loadChildren: () => import('./new-technic/new-technic.module').then( 
      m => m.NewTechnicPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
