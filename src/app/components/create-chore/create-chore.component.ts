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

  apiKey = `78adf76c3d8542de941b5538c527a637`;
  apiUrl = `https://crudcrud.com/api/${this.apiKey}/chores`;

  constructor(private http: HttpClient, private router:Router) { }

  choresForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    time: new FormControl(this.getTimeNow(), [Validators.required]),
  });

  reloadPage(): void {
    window.location.reload();
  }

  createChore(): void {
    const chore: IChore = this.choresForm.getRawValue();
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

  getTimeNow(): string {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const convertedTime = `${hour}:${minutes}`;
    return convertedTime;
  }

}
