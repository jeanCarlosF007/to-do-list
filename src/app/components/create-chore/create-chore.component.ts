import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable, first, take } from 'rxjs';

@Component({
  selector: 'app-create-chore',
  templateUrl: './create-chore.component.html',
  styleUrls: ['./create-chore.component.css']
})
export class CreateChoreComponent implements OnInit {
  
  choresForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    time: new FormControl(this.getTimeNow(), [Validators.required]),
  });

  createChore(): void {
    const title = this.choresForm.getRawValue();
    const category = this.choresForm.getRawValue();
    const time = this.choresForm.getRawValue();
    console.log(title);
    console.log(category);
    console.log(category);
  }

  getTimeNow(): string {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const convertedTime = `${hour}:${minutes}`;
    return convertedTime;
  }

  ngOnInit(): void {
    this.titleFieldTest();
  }

  private titleFieldTest(): void {
    console.log(this.choresForm.controls['title'].valueChanges.subscribe({
      next: (res) => {
        console.log(res)
      }
    }));
  }

}
