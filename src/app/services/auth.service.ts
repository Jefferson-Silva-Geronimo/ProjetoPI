import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  email: string;
  nome: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor() {
    // Verifica se há usuário salvo no localStorage
    const usuarioSalvo = localStorage.getItem('usuarioAtual');
    if (usuarioSalvo) {
      this.usuarioAtualSubject.next(JSON.parse(usuarioSalvo));
    }
  }

  login(email: string, senha: string, isAdmin: boolean = false): boolean {
    // Simulação de login - em produção, isso seria uma chamada à API
    if (email && senha) {
      const usuario: Usuario = {
        email,
        nome: email.split('@')[0],
        isAdmin
      };
      
      this.usuarioAtualSubject.next(usuario);
      localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioAtualSubject.next(null);
    localStorage.removeItem('usuarioAtual');
  }

  isLogado(): boolean {
    return this.usuarioAtualSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.usuarioAtualSubject.value?.isAdmin || false;
  }

  getUsuarioAtual(): Usuario | null {
    return this.usuarioAtualSubject.value;
  }
}

