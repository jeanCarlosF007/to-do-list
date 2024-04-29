import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { IChore } from 'src/app/models/chores-list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-chore',
  templateUrl: './create-chore.component.html',
  styleUrls: ['./create-chore.component.css']
})
export class CreateChoreComponent {

  apiKey = `323b9b41cd8d4163936d30eb5ec5586a`;
  apiUrl = `https://crudcrud.com/api/${this.apiKey}/chores`;
  choresForm!: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit():void {
    this.initializeForm();
  }

  initializeForm(): void {
      this.choresForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
        category: new FormControl('', [Validators.required]),
        time: new FormControl(this.getTimeNow(), [Validators.required]),
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  createChore(): void {
    const chore: IChore = this.choresForm.getRawValue();
    if (this.choresForm.invalid) {
      alert("Todos os campos devem estar preenchidos e o campo 'título' deve conter ao menos 4 caracteres!");
      return;
    } else {
      this.http.post(this.apiUrl, chore)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log(response);
            alert("Tarefa adicionada com sucesso!");
            this.reloadPage();
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  getTimeNow(): string {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const convertedTime = `${hour}:${minutes}`;
    return convertedTime;
  }

}
