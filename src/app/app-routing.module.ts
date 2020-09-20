import { PessoasFormComponent } from './pessoas-form/pessoas-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasListComponent } from './pessoas-list/pessoas-list.component';
import { PessoasUpdateComponent } from './pessoas-update/pessoas-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'pessoas', pathMatch: 'full' },
  { path: 'pessoas', component: PessoasListComponent },
  { path: 'add', component: PessoasFormComponent },
  { path: 'update/:id', component: PessoasUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
