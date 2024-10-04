import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentialsForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ){
    this.credentialsForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): any {
    this.authService.login(this.credentialsForm.value).subscribe({
      next: () => {
        console.log('User logged in');
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

}
