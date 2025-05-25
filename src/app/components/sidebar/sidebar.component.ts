import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  userName: string = '';
  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName') || 'Usuario';
  }

    logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userName');

        Swal.fire('Sesión cerrada', 'Has cerrado sesión exitosamente.', 'success').then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }


  // ngOnInit() {
  //   this.loadUserName();
  // }

  // Método para cargar el nombre del usuario desde el token
  // loadUserName() {
  //   if (token) {
  //     try {
  //       const decoded: any = JSON.parse(atob(token.split('.')[1])); // Decodificar el token JWT
  //       console.log('Token decodificado:', decoded); // Verifica el valor del nombre
  //       this.userName = decoded.name ? decodeURIComponent(decoded.name) : 'Usuario'; // Decodificar caracteres especiales
  //     } catch (error) {
  //       console.error('Error al decodificar el token:', error);
  //       this.userName = 'Usuario';
  //     }
  //   } else {
  //     this.userName = 'Usuario';
  //   }
  // }

  // Método para cerrar sesión
  // logout() {
  //   Swal.fire({
  //     title: '¿Estás seguro?',
  //     text: '¿Deseas cerrar la sesión?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Sí, cerrar sesión',
  //     cancelButtonText: 'Cancelar',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.cookieService.delete('authToken', '/');
  //       Swal.fire('Sesión cerrada', 'Has cerrado sesión exitosamente.', 'success').then(() => {
  //         window.location.href = '/login'; // Redirigir al login
  //       });
  //     }
  //   });
  // }
}