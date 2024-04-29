import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { IChore } from 'src/app/models/chores-list.model';

@Component({
  selector: 'app-list-chores',
  templateUrl: './list-chores.component.html',
  styleUrls: ['./list-chores.component.css']
})
export class ListChoresComponent implements OnInit {

  apiKey = `323b9b41cd8d4163936d30eb5ec5586a`;
  apiUrl = `https://crudcrud.com/api/${this.apiKey}/chores`;

  constructor(private http: HttpClient) { }

  chores?: IChore[];

  private getChores(): void {
    this.http.get<IChore[]>(this.apiUrl)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.chores = res;
        },
        error: (err) => { console.log(err); },
        complete: () => { }
      })
  }

  deleteChore(id: string): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete(url)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.getChores();
        },
        error: (err) => {
          console.log(err);
        }
      })
    alert("Tarefa deletada com sucesso!");
  }

  editionForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    time: new FormControl('')
  });

  actualId: string = '';

  getDataToEditForm(id: string) {
    this.http.get<IChore>(`${this.apiUrl}/${id}`)
      .pipe(first())
      .subscribe({
        next: (res) => {
          const chore = {
            _id: id,
            title: res.title,
            category: res.category,
            time: res.time
          };
          this.editionForm.patchValue(chore);
          this.actualId = id;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  updateChore(): void {
    const chore: IChore = this.editionForm.getRawValue();
    this.http.put(`${this.apiUrl}/${this.actualId}`, chore)
      .pipe(first())
      .subscribe({
        next: (response) => {
          alert("Tarefa atualizada com sucesso!");
          this.getChores();
        },
        error: (err) => {
          console.log(err);
        }
      });

  }

  ngOnInit(): void {
    this.getChores();
  }

}
