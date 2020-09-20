import { Component, OnInit } from '@angular/core';
import { Pessoas } from '../pessoas';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from '../pessoas.service';

@Component({
  selector: 'app-pessoas-update',
  templateUrl: './pessoas-update.component.html',
  styleUrls: ['./pessoas-update.component.css']
})
export class PessoasUpdateComponent implements OnInit {

  id: number;
  pessoas: Pessoas;

  constructor(private route: ActivatedRoute,private router: Router,
    private pessoasService: PessoasService) { }

  ngOnInit() {
    this.pessoas = new Pessoas();

    this.id = this.route.snapshot.params['id'];
    
    this.pessoasService.getPessoas(this.id)
      .subscribe(data => {
        console.log(data)
        this.pessoas = data;
      }, error => console.log(error));
  }

  updatePessoas() {
    this.pessoasService.updatePessoas(this.id, this.pessoas)
      .subscribe(data => {
        console.log(data);
        this.pessoas = new Pessoas();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updatePessoas();    
  }

  gotoList() {
    this.router.navigate(['/pessoas']);
  }
}