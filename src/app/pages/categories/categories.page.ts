import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  items = [
    { nom: "Fast food", image: "..\\assets\\cat\\icons8-street-food-50.png", router: "fastfood" },
    { nom: "Facture", image: "..\\assets\\cat\\icons8-bill-48.png", router: "facture" },
    { nom: "Medicament", image: "..\\assets\\cat\\icons8-pills-64.png", router: "medicament" },
    { nom: "Fruits", image: "..\\assets\\cat\\icons8-grape-64.png", router: "fruits" },
    { nom: "Légumes", image: "..\\assets\\cat\\icons8-radish-80.png", router: "vegetables" },
    { nom: "Produit alimentaire", image: "..\\assets\\cat\\icons8-oat-milk-64.png", router: "produit-alimentaire" },
    { nom: "Cigarette", image: "..\\assets\\cat\\icons8-cigarettes-pack-100 (1).png", router: "cigarette" },
    { nom: "Cafe", image: "..\\assets\\cat\\icons8-cafe-100.png", router: "cafe" },

  ]
  constructor() { }

  ngOnInit() {
  }

}
