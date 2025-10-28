import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.adicionarItem(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
  }
}
