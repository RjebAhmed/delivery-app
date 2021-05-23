import { InternalStorageService } from './services/internal-storage.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

const config = {
  apiKey: "AIzaSyBT0FI9qglzHCtlTiBHY31FWYFaagN81Xk",
  authDomain: "e9thili.firebaseapp.com",
  projectId: "e9thili",
  storageBucket: "e9thili.appspot.com",
  messagingSenderId: "785496571582",
  appId: "1:785496571582:web:e74bfa00ee11f90630a8ef",
  measurementId: "G-5LB48G8XBM"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InternalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
