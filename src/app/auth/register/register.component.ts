import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): any {
    if (
      this.registerForm.valid &&
      !this.passwordMatchValidator(this.registerForm)
    ) {
      const { username, password } = this.registerForm.value;
      const dataToSend = { username, password };
      console.log(dataToSend);
      this.authService.register(dataToSend).subscribe({
        next: () => {
          alert('ลงทะเบียนสำเร็จ');
          console.log('User registered');
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard')); // แก้ไขเป็น /login หลังจากสร้างหน้า login สำเร็จแล้ว
        },
        error: (err) => {
          console.log(err);
        },
      });
      console.log(this.registerForm.value);
    } else {
      alert('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      console.log('Form is invalid');
    }
  }
}
