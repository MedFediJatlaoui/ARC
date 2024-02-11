import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes';
import { WebstorgeService } from 'src/app/shared/webstorge.service';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public routes = routes;
  password:any;
  show = false;
  public CustomControler: any;
  form = new FormGroup({

    email: new FormControl('user@dreamguystech.com', [Validators.required]),
    password: new FormControl('12345', [Validators.required]),
  });


  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebstorgeService,private authService:AuthService,private router:Router) {}

  ngOnInit() {
    this.password = 'password';
  }
  authenticate() {
    // @ts-ignore
    const email = this.form.get('email').value;
    // @ts-ignore
    const password = this.form.get('password').value;
    // @ts-ignore
    this.authService.authenticate(email, password).subscribe(
      response => {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        // @ts-ignore
        localStorage.setItem('authorized', email);
        localStorage.setItem('loginTime', Date());
        this.router.navigate(['/dashboard']);
        console.log(response);
      },
      error => {
        // Traitez les erreurs ici
        console.error(error);
      })
  }

  submit() {
    if (this.form.valid) {
      this.storage.Login(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  ngOnDestroy() {}

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
