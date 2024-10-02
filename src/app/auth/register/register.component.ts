import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['']
    });
  }

  onSubmit(): any {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        console.log('User registered');
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard')); // แก้ไขเป็น /login หลังจากสร้างหน้า login สำเร็จแล้ว
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

}
