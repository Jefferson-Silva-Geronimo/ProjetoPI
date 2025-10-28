# Hype Dunk - E-commerce de Tênis em Angular

## Descrição do Projeto

Este projeto é uma **transpilação completa** do projeto original HTML/CSS/JavaScript para **Angular 19**, incluindo a implementação de um **CRUD completo** de produtos na área administrativa.

## Tecnologias Utilizadas

- **Angular 19** (Framework principal)
- **TypeScript** (Linguagem de programação)
- **RxJS** (Programação reativa)
- **Angular Router** (Navegação entre páginas)
- **CSS3** (Estilização)
- **Google Fonts** (Tipografia Poppins)

## Estrutura do Projeto

### Modelos (Models)

- **produto.model.ts**: Interface para produtos com id, nome, preço, imagem, descrição e tamanhos
- **item-carrinho.model.ts**: Interface para itens do carrinho com produto, quantidade e tamanho

### Serviços (Services)

#### ProdutoService
Implementa o **CRUD completo** de produtos:

- **CREATE**: `adicionarProduto(produto)` - Adiciona novo produto
- **READ**: `getProdutos()` - Lista todos os produtos
- **READ**: `getProdutoById(id)` - Busca produto por ID
- **UPDATE**: `atualizarProduto(id, produto)` - Atualiza produto existente
- **DELETE**: `removerProduto(id)` - Remove produto

#### CarrinhoService
Gerencia o carrinho de compras:

- `adicionarItem(produto, quantidade, tamanho)` - Adiciona item ao carrinho
- `removerItem(produtoId, tamanho)` - Remove item do carrinho
- `atualizarQuantidade(produtoId, quantidade, tamanho)` - Atualiza quantidade
- `limparCarrinho()` - Limpa todos os itens
- `getTotal()` - Calcula total do carrinho
- `getQuantidadeTotal()` - Retorna quantidade total de itens

#### AuthService
Gerencia autenticação de usuários:

- `login(email, senha, isAdmin)` - Realiza login
- `logout()` - Realiza logout
- `isLogado()` - Verifica se usuário está logado
- `isAdmin()` - Verifica se usuário é administrador
- `getUsuarioAtual()` - Retorna usuário atual

### Guards

- **adminGuard**: Protege rotas administrativas, permitindo acesso apenas para usuários admin

### Componentes

#### Componentes Compartilhados

- **Header**: Cabeçalho com navegação, logo e contador de carrinho
- **Footer**: Rodapé com informações de copyright

#### Páginas

1. **Home** (`/home`)
   - Listagem de todos os produtos
   - Botões para ver detalhes e adicionar ao carrinho

2. **Login** (`/login`)
   - Formulário de login para clientes
   - Link para área administrativa
   - Link para cadastro

3. **Login Admin** (`/login-admin`)
   - Formulário de login específico para administradores
   - Acesso à área de gerenciamento de produtos

4. **Cadastro** (`/cadastro`)
   - Formulário de cadastro de novos usuários

5. **Admin Produtos** (`/admin/produtos`) - **PROTEGIDA**
   - **CRUD COMPLETO** de produtos
   - Listagem em grid de todos os produtos
   - Botão "Incluir Novo Produto"
   - Modal para criar/editar produtos
   - Botões de editar e excluir em cada produto
   - Campos: nome, preço, imagem (URL), descrição

6. **Carrinho** (`/carrinho`)
   - Listagem de itens no carrinho
   - Controle de quantidade (+/-)
   - Remoção de itens
   - Resumo da compra (subtotal, frete, total)
   - Finalização de compra

7. **Produto Detalhe** (`/produto/:id`)
   - Detalhes completos do produto
   - Seleção de tamanho
   - Adicionar ao carrinho
   - Imagem ampliada

## Funcionalidades Implementadas

### CRUD de Produtos (Área Admin)

O sistema possui um **CRUD completo e funcional** na área administrativa:

#### Create (Criar)
- Botão "Incluir Novo Produto" abre modal
- Formulário com campos: nome, preço, imagem, descrição
- Validação de campos obrigatórios
- Geração automática de ID único
- Atualização reativa da lista

#### Read (Ler)
- Listagem em grid responsivo
- Exibição de imagem, nome e preço
- Observável reativo (RxJS) para atualizações automáticas
- Busca por ID individual

#### Update (Atualizar)
- Botão "Editar" em cada produto
- Modal pré-preenchido com dados atuais
- Atualização em tempo real
- Preservação do ID original

#### Delete (Excluir)
- Botão "Excluir" em cada produto
- Confirmação antes de excluir
- Remoção imediata da lista
- Feedback visual

### Sistema de Carrinho

- Adicionar produtos com quantidade e tamanho
- Atualizar quantidade de itens
- Remover itens individualmente
- Cálculo automático de subtotal, frete e total
- Persistência durante a sessão
- Contador no header

### Sistema de Autenticação

- Login de cliente e administrador
- Proteção de rotas com guard
- Persistência no localStorage
- Logout funcional
- Indicador visual de usuário logado

### Navegação

- Roteamento completo entre todas as páginas
- Links ativos destacados
- Menu responsivo (hamburger)
- Navegação programática após ações

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm instalado

### Instalação

```bash
cd hype-dunk-angular
npm install
```

### Desenvolvimento

```bash
ng serve
```

Acesse: `http://localhost:4200`

### Build de Produção

```bash
ng build
```

Os arquivos compilados estarão em `dist/hype-dunk-angular/`

## Rotas da Aplicação

| Rota | Componente | Descrição | Protegida |
|------|-----------|-----------|-----------|
| `/` | - | Redireciona para `/home` | Não |
| `/home` | Home | Página inicial com produtos | Não |
| `/login` | Login | Login de cliente | Não |
| `/login-admin` | LoginAdmin | Login de administrador | Não |
| `/cadastro` | Cadastro | Cadastro de usuário | Não |
| `/carrinho` | Carrinho | Carrinho de compras | Não |
| `/produto/:id` | ProdutoDetalhe | Detalhes do produto | Não |
| `/admin/produtos` | AdminProdutos | CRUD de produtos | **Sim** (Admin) |

## Dados Iniciais

O sistema vem com 6 produtos pré-cadastrados:

1. Nike Dunk Low - R$ 899,90
2. Air Jordan 1 - R$ 1.299,90
3. Nike Air Force - R$ 799,90
4. Puma RS-X - R$ 699,90
5. Nike Dunk Low Panda - R$ 899,90
6. Air Jordan 1 Mid - R$ 1.299,90

Todos os produtos possuem tamanhos de 38 a 44.

## Armazenamento de Dados

Atualmente, os dados são armazenados **em memória** usando:

- **BehaviorSubject** do RxJS para produtos
- **Array local** no serviço
- **localStorage** para autenticação

Para persistência real, seria necessário integrar com um backend (API REST, Firebase, etc.).

## Melhorias Futuras

- Integração com backend real (API REST)
- Banco de dados (PostgreSQL, MongoDB)
- Upload de imagens real
- Sistema de pagamento
- Histórico de pedidos
- Perfil de usuário
- Busca e filtros de produtos
- Avaliações e comentários
- Sistema de cupons de desconto
- Notificações por e-mail

## Diferenças do Projeto Original

### Melhorias Implementadas

1. **Arquitetura Moderna**: Uso de componentes standalone do Angular 19
2. **Tipagem Forte**: TypeScript em todo o código
3. **Programação Reativa**: RxJS para gerenciamento de estado
4. **Roteamento Avançado**: Angular Router com guards
5. **Componentização**: Separação clara de responsabilidades
6. **Serviços Injetáveis**: Compartilhamento de lógica entre componentes
7. **CRUD Funcional**: Operações completas no gerenciamento de produtos
8. **Validações**: Formulários com validação
9. **Responsividade**: Mantida e aprimorada
10. **Código Limpo**: Seguindo boas práticas do Angular

## Estrutura de Arquivos

```
hype-dunk-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── login-admin/
│   │   │   ├── cadastro/
│   │   │   ├── carrinho/
│   │   │   ├── produto-detalhe/
│   │   │   └── admin-produtos/
│   │   ├── models/
│   │   │   ├── produto.model.ts
│   │   │   └── item-carrinho.model.ts
│   │   ├── services/
│   │   │   ├── produto.service.ts
│   │   │   ├── carrinho.service.ts
│   │   │   └── auth.service.ts
│   │   ├── guards/
│   │   │   └── admin.guard.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   └── app.routes.ts
│   ├── styles.css
│   └── index.html
├── public/
│   └── img-tenis/
├── angular.json
├── package.json
└── tsconfig.json
```

## Autor

Projeto transpilado de HTML/CSS/JavaScript para Angular com implementação completa de CRUD.

## Licença

Este é um projeto educacional.

