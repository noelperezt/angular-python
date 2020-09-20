import { PessoasService } from '../pessoas.service';
import { Pessoas } from '../pessoas';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.css']
})
export class PessoasFormComponent implements OnInit {

  pessoas: Pessoas = new Pessoas();
  submitted = false;
  fileToUpload: File = null;

  constructor(private pessoasService: PessoasService,
    private router: Router) { }

  ngOnInit() {
  }

  newPessoas(): void {
    this.submitted = false;
    this.pessoas = new Pessoas();
  }

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
  }

  save() {
    console.log(this.pessoas);
    const formData = new FormData();
    formData.append('nome', this.pessoas.nome);
    formData.append('cargo', this.pessoas.cargo);
    formData.append('cpf', this.pessoas.cpf);
    formData.append('foto', this.fileToUpload);
    this.pessoasService
    .createPessoas(formData).subscribe(data => {
      console.log(data)
      this.pessoas = new Pessoas();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/pessoas']);
  }
}
