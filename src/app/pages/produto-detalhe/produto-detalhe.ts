import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto-detalhe',
  imports: [CommonModule, RouterModule],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.css',
})
export class ProdutoDetalhe implements OnInit {
  produto: Produto | undefined;
  tamanhoSelecionado: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produto = this.produtoService.getProdutoById(id);
  }

  adicionarAoCarrinho(): void {
    if (!this.produto) return;
    
    if (this.produto.tamanhos && !this.tamanhoSelecionado) {
      alert('Por favor, selecione um tamanho!');
      return;
    }

    this.carrinhoService.adicionarItem(this.produto, 1, this.tamanhoSelecionado);
    alert(`${this.produto.nome} adicionado ao carrinho!`);
  }
}
