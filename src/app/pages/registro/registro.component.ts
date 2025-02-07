import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordar = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      text: 'Espere por favor...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    console.log(this.usuario);
    console.log(form);

    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {

        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/home');
        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
        }

      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error',
          text: err.error.error.message,
          icon: 'error',
          allowOutsideClick: false
        });

      });
  }
}
