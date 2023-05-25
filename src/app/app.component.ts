import { Component, ViewEncapsulation } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Router } from '@angular/router';


Amplify.configure(awsconfig);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'Add Asset', url: '/add-transaction', icon: 'add' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  public labels = ['Portfolio one', 'Portfolio two', 'Portfolio three'];
  constructor(private router: Router) {}

  async signOut() {
    try {
      await Auth.signOut();
    window.location.reload();
    this.router.navigate(['']);
} catch (error) {
      console.log('Error signing out: ', error);
    }
  }
}
