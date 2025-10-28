import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/item-carrinho.model';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  itens: ItemCarrinho[] = [];
  subtotal = 0;
  frete = 29.90;
  total = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carrinhoService.itens$.subscribe(itens => {
      this.itens = itens;
      this.calcularTotais();
    });
  }

  calcularTotais(): void {
    this.subtotal = this.carrinhoService.getTotal();
    this.total = this.subtotal + (this.itens.length > 0 ? this.frete : 0);
  }

  atualizarQuantidade(item: ItemCarrinho, novaQuantidade: number): void {
    if (novaQuantidade > 0) {
      this.carrinhoService.atualizarQuantidade(item.produto.id, novaQuantidade, item.tamanho);
    }
  }

  removerItem(item: ItemCarrinho): void {
    if (confirm(`Deseja remover ${item.produto.nome} do carrinho?`)) {
      this.carrinhoService.removerItem(item.produto.id, item.tamanho);
    }
  }

  finalizarCompra(): void {
    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    alert('Compra finalizada com sucesso! Total: R$ ' + this.total.toFixed(2));
    this.carrinhoService.limparCarrinho();
  }
}
