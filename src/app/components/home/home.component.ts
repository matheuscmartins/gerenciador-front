import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  longText = `Com o motor V-Twin Milwaukee-Eight 121 de Alto Desempenho (HO) é 
  calibrado para produzir mais potência e torque do que o motor Milwaukee-Eight 
  VVT 121, com um comando de válvulas de alto desempenho, uma admissão de ar de 
  alto desempenho inspirada em corridas e um elevado corte de giro em 5.900 RPM.`;
}
