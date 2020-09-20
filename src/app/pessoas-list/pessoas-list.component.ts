import { Observable } from "rxjs";
import { PessoasService } from "../pessoas.service";
import { Pessoas } from "../pessoas";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-pessoas-list",
  templateUrl: "./pessoas-list.component.html",
  styleUrls: ["./pessoas-list.component.css"]
})
export class PessoasListComponent implements OnInit {
  pessoas: Observable<Pessoas[]>;
  url = "http://localhost:8080"

  constructor(private pessoasService: PessoasService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.pessoas = this.pessoasService.getPessoasList();
  }

  deletePessoas(id: number) {
    if(confirm("Deseja apagar o cadastro?")) {
      this.pessoasService.deletePessoas(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    }
  }

  updatePessoas(id: number){
    this.router.navigate(['update', id]);
  }

  formataCPF(cpf){
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

}
