import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  quantidadeCarrinho = 0;
  menuAberto = false;
  usuarioLogado = false;
  isAdmin = false;

  constructor(
    private carrinhoService: CarrinhoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carrinhoService.itens$.subscribe(itens => {
      this.quantidadeCarrinho = this.carrinhoService.getQuantidadeTotal();
    });

    this.authService.usuarioAtual$.subscribe(usuario => {
      this.usuarioLogado = usuario !== null;
      this.isAdmin = usuario?.isAdmin || false;
    });
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  logout(): void {
    this.authService.logout();
  }
}
