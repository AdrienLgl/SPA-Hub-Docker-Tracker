//Importation
import { Component, OnInit, ViewChild, ComponentFactoryResolver,Type, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ListComponent } from '../list/list.component';
import { Directive } from '@angular/core';

@Directive({ selector: '[phvisDisplayCustomers]' })
  export class DisplayCustomersDirective {
    constructor() {
      var d1 = document.getElementById('image_list');
      d1.insertAdjacentHTML('afterend', 'image_list');
    }
  }

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})

export class ContainerComponent {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];
  draggableComponentClass = ListComponent;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private httpClient: HttpClient) {
  }

  //Fonction qui execute la requête et qui affiche les résultats
  getImage(componentClass: Type<any>){
    const app = document.getElementById("results");
    app.innerText = " ";
    var user = ((document.getElementById("form_input") as HTMLInputElement).value);
    if(user.length<1){
      alert('Attention, vous devez saisir un nom d\'utilisateur !!');
    }else{
    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }
 
  const container = document.querySelector('#image_list');
  removeAllChildNodes(container);
    this.httpClient
      .get<any[]>('http://hub.docker.com/v2/repositories/'+user)
      .subscribe(data => {
      if(data['count']!=0 ){
        
        for (let index = 0; index < data['results'].length; index++) {
          //Récupération de la date
          var date = data['results'][index]['last_updated'];
          if(date == null){
            date = "Aucune date";
          }else{
            date = date.slice(0, 10);
          }
          //Ajout des components en fonction du nombre de résultats
          /*const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
          const component = this.container.createComponent(componentFactory);
          this.components.push(component);*/ 
          const app = document.getElementById("image_list");
          const p = document.createElement("ul");
          p.innerHTML='<li id="ligne" class="list-group-item" style="margin-top: 1em; background-color: #F5F3F3;"><div><h6>User : '+data['results'][index]['user']+'</h6><h6>Name : '+data['results'][index]['name']+'</h6><h6>Release : ' + date+ '</h6><h6>Description : '+data['results'][index]['description']+'</h6><h6>Modification : '+data['results'][index]['pull_count']+'</h6><img src="../assets/logo.png" style="width:10em;"/></div></li>';
          app?.appendChild(p);

      }
        }else{
          //Si aucun résultat pour le nom rentré par l'utilisateur
          const app = document.getElementById("image_list");
          const p = document.createElement("h4");
          p.innerText = "Aucune image à afficher pour cet utilisateur";
          app?.appendChild(p);
        }
      },
      error => {
        //Si une erreur se produit lors de la requête
        alert('Oups, il semblerait que cet utilisateur n\'existe pas...');
      }
      );
  }
}



  //Fonction qui execute la requête et qui affiche les résultats en fonction de la date d'aujourd'hui
  getImage_date(componentClass: Type<any>){

  //Efface les éléments 'enfants' du parent

    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }

    var user = ((document.getElementById("form_input") as HTMLInputElement).value);
    if(user.length<1){
      alert('Attention, vous devez saisir un nom d\'utilisateur !!');
    }else{

  const container = document.querySelector('#image_list');
  removeAllChildNodes(container);
    this.httpClient
      .get<any[]>('http://hub.docker.com/v2/repositories/'+user)
      .subscribe(data => {
        const date1 = new Date().toISOString().slice(0,10);
        var tab_results = [];

      if(data['count']!=0 ){
        for (let index = 0; index < data['results'].length; index++) {
          var date = data['results'][index]['last_updated'];
          if(date == null){
            date = "Aucune date";
          }else{
            date = date.slice(0, 10);
          }
          if(date1 == date ){ 
          console.log(data['results'][index]);
          /*const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
          const component = this.container.createComponent(componentFactory);
          this.components.push(component);*/ 
          const app = document.getElementById("image_list");
          const p = document.createElement("ul");
          p.innerHTML='<li id="ligne" class="list-group-item" style="margin-top: 1em; background-color: #F5F3F3;"><div><h6>User : '+data['results'][index]['user']+'</h6><h6>Name : '+data['results'][index]['name']+'</h6><h6>Release : ' + date+ '</h6><h6>Description : '+data['results'][index]['description']+'</h6><h6>Modification : '+data['results'][index]['pull_count']+'</h6></div><img src="../assets/logo.png" style="width:10em;"/></li>';
          app?.appendChild(p);
          tab_results.push(index);
          }
      }

      //Si aucun résultat pour la date en question (stockés dans le tableau tab_results)
      if(tab_results.length<1){
        const app = document.getElementById("results");
        app.innerText = "Aucune modification récente...";
      }

        }else{
          const app = document.getElementById("image_list");
          const p = document.createElement("h4");
          p.innerText = "Aucune image à afficher pour cet utilisateur";
          app?.appendChild(p);
        }
      },
      error => {
        alert('Oups, il semblerait que cet utilisateur n\'existe pas...');
      }
      );
  }
}


}
