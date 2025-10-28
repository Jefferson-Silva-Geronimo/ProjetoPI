import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  senha = '';
  lembrar = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  fazerLogin(): void {
    if (!this.email || !this.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const sucesso = this.authService.login(this.email, this.senha, false);
    
    if (sucesso) {
      this.router.navigate(['/home']);
    } else {
      alert('Erro ao fazer login!');
    }
  }
}
