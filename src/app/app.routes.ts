import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { LoginAdmin } from './pages/login-admin/login-admin';
import { Cadastro } from './pages/cadastro/cadastro';
import { AdminProdutos } from './pages/admin-produtos/admin-produtos';
import { Carrinho } from './pages/carrinho/carrinho';
import { ProdutoDetalhe } from './pages/produto-detalhe/produto-detalhe';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'login-admin', component: LoginAdmin },
  { path: 'cadastro', component: Cadastro },
  { path: 'carrinho', component: Carrinho },
  { path: 'produto/:id', component: ProdutoDetalhe },
  { 
    path: 'admin/produtos', 
    component: AdminProdutos,
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: '/home' }
];
