import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  first_section: boolean=false;
  second_section: boolean=false;
  third_section: boolean=false;
  fourth_section: boolean=false;

  constructor() { }

  ngOnInit() {
  }

  first() {
    this.first_section = true;
    this.second_section = false;
    this.third_section = false;
    this.fourth_section = false;
  }

  second() {
    this.first_section = false;
    this.second_section = true;
    this.third_section = false;
    this.fourth_section = false;
  }

  third() {
    this.first_section = false;
    this.second_section = false;
    this.third_section = true;
    this.fourth_section = false;
  }

  fourth() {
    
    this.first_section = false;
    this.second_section = false;
    this.third_section = false;
    this.fourth_section = true;
  }

}
