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

  apiKey = `a1623aa7aafd49449368d44fc1324461`;
  apiUrl = `https://crudcrud.com/api/${this.apiKey}/chores`;

  constructor(private http: HttpClient) { }

  chores?: IChore[];

  private getChores(): void {
    this.http.get<IChore[]>(this.apiUrl)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.chores = res;
          console.log(res);
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

  getDataToEditForm(id: string) {
    this.http.get<IChore>(`${this.apiUrl}/${id}`)
      .pipe(first())
      .subscribe({
        next: (res) => {
          const chore = {
            _id: res._id,
            title: res.title,
            category: res.category,
            time: res.time
          };
          this.editionForm.patchValue(chore);
        },
        error: (err) => {
          console.log(err);
        }
      })
    const chore: IChore = this.editionForm.getRawValue();
    console.log(chore._id)
  }

  updateChore(id: string): void {
    const chore: IChore = this.editionForm.getRawValue();
    this.http.put(`${this.apiUrl}/${id}`, chore)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      });
    alert("Tarefa atualizada com sucesso!");
  }

  ngOnInit(): void {
    // this.getChores();
  }

}
