import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-admin-produtos',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-produtos.html',
  styleUrl: './admin-produtos.css',
})
export class AdminProdutos implements OnInit {
  produtos: Produto[] = [];
  modalAberto = false;
  modoEdicao = false;
  produtoAtual: Partial<Produto> = {};
  produtoEditandoId: number | null = null;
  tamanhoTemp: number | null = null;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  abrirModalIncluir(): void {
    this.modoEdicao = false;
    this.produtoAtual = {
      nome: '',
      preco: 0,
      imagem: '',
      descricao: ''
    };
    this.modalAberto = true;
  }

  abrirModalEditar(produto: Produto): void {
    this.modoEdicao = true;
    this.produtoEditandoId = produto.id;
    this.produtoAtual = { ...produto };
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.produtoAtual = {};
    this.produtoEditandoId = null;
  }

  salvarProduto(): void {
    if (!this.produtoAtual.nome || !this.produtoAtual.preco || !this.produtoAtual.imagem) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (this.modoEdicao && this.produtoEditandoId !== null) {
      // UPDATE
      const sucesso = this.produtoService.atualizarProduto(this.produtoEditandoId, this.produtoAtual);
      if (sucesso) {
        alert('Produto atualizado com sucesso!');
        this.fecharModal();
      } else {
        alert('Erro ao atualizar produto!');
      }
    } else {
      // CREATE
      this.produtoService.adicionarProduto(this.produtoAtual as Omit<Produto, 'id'>);
      alert('Produto adicionado com sucesso!');
      this.fecharModal();
    }
  }

  excluirProduto(id: number, nome: string): void {
    if (confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
      // DELETE
      const sucesso = this.produtoService.removerProduto(id);
      if (sucesso) {
        alert('Produto excluído com sucesso!');
      } else {
        alert('Erro ao excluir produto!');
      }
    }
  }
  adicionarTamanho(): void {
    if (this.tamanhoTemp == null || this.tamanhoTemp <= 0) {
      alert('Informe um tamanho válido!');
      return;
    }

    if (!this.produtoAtual.tamanhos) {
      this.produtoAtual.tamanhos = [];
    }

    if (this.produtoAtual.tamanhos.includes(this.tamanhoTemp)) {
      alert('Este tamanho já foi adicionado!');
      return;
    }

    this.produtoAtual.tamanhos.push(this.tamanhoTemp);
    this.tamanhoTemp = null;
  }

  removerTamanho(tamanho: number): void {
    if (!this.produtoAtual.tamanhos) return;
    this.produtoAtual.tamanhos = this.produtoAtual.tamanhos.filter(t => t !== tamanho);
  }
}
