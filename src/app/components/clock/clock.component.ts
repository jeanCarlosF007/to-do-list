import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent {

  currentTime: string = '';
  intervalId: any;

  ngOnInit():void {
    this.showTime();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  showTime(): void {
    this.intervalId = setInterval(() => {
      this.currentTime = `${this.getWeekDay()}, ${this.getMonthDate()}, ${this.getHours()}`;
    }, 5000);
  }

  getWeekDay(): string {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    switch (dayOfWeek) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda-Feira';
      case 2:
        return 'Terça-Feira';
      case 3:
        return 'Quarta-Feira';
      case 4:
        return 'Quinta-Feira';
      case 5:
        return 'Sexta-Feira';
      case 6:
        return 'Sábado';
      default:
        return 'Valor inválido';
    }
  }

  getMonthDate(): string {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    switch (currentMonth) {
      case 0:
        return `${currentDay} de Janeiro de ${currentYear}`;
      case 1:
        return `${currentDay} de Fevereiro de ${currentYear}`;
      case 2:
        return `${currentDay} de Março de ${currentYear}`;
      case 3:
        return `${currentDay} de Abril de ${currentYear}`;
      case 4:
        return `${currentDay} de Maio de ${currentYear}`;
      case 5:
        return `${currentDay} de Junho de ${currentYear}`;
      case 6:
        return `${currentDay} de Julho de ${currentYear}`;
      case 7:
        return `${currentDay} de Agosto de ${currentYear}`;
      case 8:
        return `${currentDay} de Setembro de ${currentYear}`;
      case 9:
        return `${currentDay} de Outubro de ${currentYear}`;
      case 10:
        return `${currentDay} de Novembro de ${currentYear}`;
      case 11:
        return `${currentDay} de Dezembro de ${currentYear}`;
      default:
        return `Valores inválidos`
    }
  }

  getHours(): string {
    const currentDate = new Date();
    const hours = ('0' + currentDate.getHours()).toString().slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).toString().slice(-2);
    return `${hours}:${minutes}`;
  }

}
