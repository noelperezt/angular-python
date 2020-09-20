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
  submitted = false;
  fileToUpload: File = null;
  url = "http://localhost:8080"
  imageSrc: any;

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
    const formData = new FormData();
    formData.append('nome', this.pessoas.nome);
    formData.append('cargo', this.pessoas.cargo);
    formData.append('cpf', this.pessoas.cpf);
    formData.append('foto', this.fileToUpload);
    this.pessoasService.updatePessoas(this.id, formData)
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

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
  }

  displayPhoto(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
    const reader = new FileReader();
  
    reader.onload = ((e) => {
      this.imageSrc = e.target['result'];
    });
  
    reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
