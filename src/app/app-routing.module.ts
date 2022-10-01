import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./account/account.component').then(
        (c) => c.AccountComponent
      );
    },
  },
  {
    path: 'list',
    loadComponent() {
      return import('./wish-list/wish-list.component').then(
        (c) => c.WishListComponent
      );
    },
  },
  {
    path: 'auth',
    loadComponent() {
      return import('./auth/auth.component').then((c) => c.AuthComponent);
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
