import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
})
export class LoginAdmin {
  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  fazerLogin(): void {
    if (!this.email || !this.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const sucesso = this.authService.login(this.email, this.senha, true);
    
    if (sucesso) {
      this.router.navigate(['/admin/produtos']);
    } else {
      alert('Erro ao fazer login!');
    }
  }
}
