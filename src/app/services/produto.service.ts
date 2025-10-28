import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Nike Dunk Low',
      preco: 899.90,
      imagem: '/img-tenis/tipo-tenis-1.jpg',
      descricao: 'Tênis Nike Dunk Low com design clássico e confortável.',
      tamanhos: [38, 39, 40, 41, 42, 43, 44]
    },
    {
      id: 2,
      nome: 'Air Jordan 1',
      preco: 1299.90,
      imagem: '/img-tenis/tipo-tenis-2.jpg',
      descricao: 'Icônico Air Jordan 1 com estilo atemporal.',
      tamanhos: [38, 39, 40, 41, 42, 43, 44]
    },
    {
      id: 3,
      nome: 'Nike Air Force',
      preco: 799.90,
      imagem: '/img-tenis/tipo-tenis-3.jpg',
      descricao: 'Nike Air Force 1 - O clássico que nunca sai de moda.',
      tamanhos: [38, 39, 40, 41, 42, 43, 44]
    },
    {
      id: 4,
      nome: 'Puma RS-X',
      preco: 699.90,
      imagem: '/img-tenis/tipo-tenis-4.jpg',
      descricao: 'Puma RS-X com tecnologia de amortecimento avançada.',
      tamanhos: [38, 39, 40, 41, 42, 43, 44]
    },
    {
      id: 5,
      nome: 'Nike Dunk Low Panda',
      preco: 899.90,
      imagem: '/img-tenis/tipo-tenis-5.jpg',
      descricao: 'Nike Dunk Low na colorway Panda, um dos modelos mais desejados.',
      tamanhos: [38, 39, 40, 41, 42, 43, 44]
    },
    {
      id: 6,
      nome: 'Air Jordan 1 Mid',
      preco: 1299.90,
      imagem: '/img-tenis/tipo-tenis-6.jpg',
      descricao: 'Air Jordan 1 Mid com design moderno e confortável.',
      tamanhos: [38, 39, 40, 41, 42, 43, 44]
    }
  ];

  private produtosSubject = new BehaviorSubject<Produto[]>(this.produtos);
  public produtos$ = this.produtosSubject.asObservable();

  constructor() {}

  // READ - Obter todos os produtos
  getProdutos(): Observable<Produto[]> {
    return this.produtos$;
  }

  // READ - Obter produto por ID
  getProdutoById(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  // CREATE - Adicionar novo produto
  adicionarProduto(produto: Omit<Produto, 'id'>): Produto {
    const novoId = this.produtos.length > 0 
      ? Math.max(...this.produtos.map(p => p.id)) + 1 
      : 1;
    
    const novoProduto: Produto = {
      ...produto,
      id: novoId
    };

    this.produtos.push(novoProduto);
    this.produtosSubject.next([...this.produtos]);
    return novoProduto;
  }

  // UPDATE - Atualizar produto existente
  atualizarProduto(id: number, produtoAtualizado: Partial<Produto>): boolean {
    const index = this.produtos.findIndex(p => p.id === id);
    
    if (index !== -1) {
      this.produtos[index] = {
        ...this.produtos[index],
        ...produtoAtualizado,
        id: id // Garante que o ID não seja alterado
      };
      this.produtosSubject.next([...this.produtos]);
      return true;
    }
    
    return false;
  }

  // DELETE - Remover produto
  removerProduto(id: number): boolean {
    const index = this.produtos.findIndex(p => p.id === id);
    
    if (index !== -1) {
      this.produtos.splice(index, 1);
      this.produtosSubject.next([...this.produtos]);
      return true;
    }
    
    return false;
  }

  // Método auxiliar para obter produtos em lançamento
  getProdutosLancamento(): Produto[] {
    return this.produtos.slice(0, 3);
  }
}

