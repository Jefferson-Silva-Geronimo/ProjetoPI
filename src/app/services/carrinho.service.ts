import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itens: ItemCarrinho[] = [];
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>(this.itens);
  public itens$ = this.itensSubject.asObservable();

  constructor() {}

  getItens(): Observable<ItemCarrinho[]> {
    return this.itens$;
  }

  adicionarItem(produto: Produto, quantidade: number = 1, tamanho?: number): void {
    const itemExistente = this.itens.find(
      item => item.produto.id === produto.id && item.tamanho === tamanho
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({ produto, quantidade, tamanho });
    }

    this.itensSubject.next([...this.itens]);
  }

  removerItem(produtoId: number, tamanho?: number): void {
    this.itens = this.itens.filter(
      item => !(item.produto.id === produtoId && item.tamanho === tamanho)
    );
    this.itensSubject.next([...this.itens]);
  }

  atualizarQuantidade(produtoId: number, quantidade: number, tamanho?: number): void {
    const item = this.itens.find(
      item => item.produto.id === produtoId && item.tamanho === tamanho
    );

    if (item) {
      item.quantidade = quantidade;
      if (item.quantidade <= 0) {
        this.removerItem(produtoId, tamanho);
      } else {
        this.itensSubject.next([...this.itens]);
      }
    }
  }

  limparCarrinho(): void {
    this.itens = [];
    this.itensSubject.next([...this.itens]);
  }

  getTotal(): number {
    return this.itens.reduce(
      (total, item) => total + (item.produto.preco * item.quantidade),
      0
    );
  }

  getQuantidadeTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }
}

