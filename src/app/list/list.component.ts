import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Directive } from '@angular/core';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() imageName: string;
  @Input() imageDate: string;
  @Input() imageContent: string;

  
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

 

  

}
