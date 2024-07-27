import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { MyInfoService } from '../../../services/my-info.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
})
export class MyInfoComponent implements OnInit {
  user: User | null = null;
  form: FormGroup;

  constructor(
    private myInfoService: MyInfoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.myInfoService.getUserInfo().subscribe({
      next: (response) => {
        console.log('User info received:', response);
        this.user = response;
        this.form.patchValue({
          name: this.user.name,
          email: this.user.email
        });
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar la información del usuario',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  actualizar(): void {
    if (this.user) {
      const updatedUser = { ...this.user, ...this.form.value };
      this.myInfoService.updateUserInfo(updatedUser).subscribe({
        next: (response) => {
          console.log('User info updated:', response);
          this.user = response;
          Swal.fire({
            title: 'Actualización exitosa',
            text: 'Tu información ha sido actualizada correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        },
        error: (error) => {
          console.error('Error updating user info:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar la información',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }

  eliminar(): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.myInfoService.deleteUser().subscribe({
          next: () => {
            Swal.fire({
              title: "¡Usuario eliminado!",
              text: "Tu usuario ha sido eliminado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
          },
          error: () => {
            Swal.fire({
              title: "Oops!",
              text: "Ha ocurrido un error",
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }

  editar(): void {
    if (this.user) {
      Swal.fire({
        title: 'Cambiar Contraseña',
        input: 'password',
        inputLabel: 'Nueva Contraseña',
        inputPlaceholder: 'Ingrese su nueva contraseña',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const updatedUser = { ...this.user, password: result.value };
          this.myInfoService.updateUserInfo(updatedUser).subscribe({
            next: (response) => {
              console.log('Password updated:', response);
              Swal.fire({
                title: 'Contraseña Actualizada',
                text: 'Tu contraseña ha sido actualizada correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
             
            },
            error: (error) => {
              console.error('Error updating password:', error);
              Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar la contraseña',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        }
      });
    }
  }
}