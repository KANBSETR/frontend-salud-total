import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loggedInUser: string | null = null;

  constructor(private router: Router) {}

  // Login estático solo para pruebas
  login() {
    if (this.email.trim() && this.password.trim()) {
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: `Bienvenido, ${this.email}`,
        confirmButtonText: 'Continuar'
      }).then(() => {
        this.loggedInUser = this.email;
        localStorage.setItem('userName', this.email);
        this.router.navigate(['/dashboard']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar correo y contraseña',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  }


  logout() {
    this.loggedInUser = null;
    this.email = '';
    this.password = '';
    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente',
      confirmButtonText: 'Aceptar'
    });
  }

  // Por si vamos a poner el login con la API:
  /*
  // Método para iniciar sesión con API real
  // login() {
  //   const loginData = { email: this.email, password: this.password };
  //   this.http.post('tuAPIchula', loginData).subscribe({
  //     next: (response: any) => {
  //       // Guardar token, usuario, etc.
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Inicio de sesión exitoso',
  //         text: `Bienvenido, ${response.user.name}`,
  //         confirmButtonText: 'Continuar'
  //       }).then(() => {
  //         this.router.navigate(['/dashboard']);
  //       });
  //     },
  //     error: () => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Correo o contraseña incorrectos',
  //         confirmButtonText: 'Intentar de nuevo'
  //       });
  //     }
  //   });
  // }
  */
}