import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currency = "$";
  form = this.fb.group({
    product: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
    service: ['burger'],
  });
  burgerMenuOpen = false;
  productsData = [
    {
      image: "1.png",
      title: "Burger s čedarom a slaninou",
      text: "Hovädzia placka Krispy Kreme, žemľa, paradajka, syr Cheddar, chrumkavá slanina, červená cibuľa, ľadový šalát, majonéza, kečup, syrová omáčka.",
      price: 8,
      basePrice: 8,
      grams: 360
    },
    {
      image: "2.png",
      title: "BBQ so slaninou a kuracím mäsom",
      text: "Briošová žemľa so sezamom, kurací rezeň, syr čedar, paradajka, nakladaná uhorka, nakladaná cibuľa, rímsky šalát, slanina, BBQ omáčka.",
      price: 7,
      basePrice: 7,
      grams: 390
    },
    {
      image: "3.png",
      title: "Double beef burger",
      text: "Dve hovädzie placky, syr čedar, šalát romano, uhorky, čerstvé paradajky, slanina, červená cibuľa, omáčka na hamburgery, horčica.",
      price: 10,
      basePrice: 10,
      grams: 420
    },
    {
      image: "4.png",
      title: "Bavorský burger",
      text: "Burgerová žemľa, hovädzia placka, červená cibuľa, syr, poľovnícka klobása, BBQ omáčka, syrová omáčka, ľadový šalát.",
      price: 7,
      basePrice: 7,
      grams: 220
    },
    {
      image: "5.png",
      title: "Cheeseburger so slaninou",
      text: "Burgerová žemľa, hovädzia placka, chrumkavá slanina, paradajka, nakladaná uhorka, syr, syrová omáčka, kečup, zelenina.",
      price: 8,
      basePrice: 8,
      grams: 220
    },
    {
      image: "6.png",
      title: "Indiana burger",
      text: "Burgerová žemľa, kuracie prsia, chrumkavá slanina, vajce, nakladaná uhorka, chrumkavá cibuľka, kečup, syrová omáčka, horčica, zelenina.",
      price: 9,
      basePrice: 9,
      grams: 320
    },
    {
      image: "7.png",
      title: "Veggie burger",
      text: "Burgerová žemľa, vegetariánska placka, červená cibuľa, syr, čerstvé paradajky, BBQ omáčka, syrová omáčka, ľadový šalát.",
      price: 8,
      basePrice: 8,
      grams: 280
    },
    {
      image: "8.png",
      title: "Bawdy Joe",
      text: "Burgerová žemľa, hovädzia placka, chrumkavá slanina, paradajka, nakladaná uhorka, červená cibuľa, syr, papričky jalapeño, kečup, bylinky",
      price: 7,
      basePrice: 7,
      grams: 380
    },
    {
      image: "9.png",
      title: "Double Cheese Burger",
      text: "Burgerová žemľa, dve hovädzie placky, dvojnásobná dávka syra čedar, nakladaná uhorka, chrumkavá cibuľka, kečup, syrová omáčka, horčica, bylinky.",
      price: 11,
      basePrice: 11,
      grams: 400
    },
    {
      image: "10.png",
      title: "Freshburger",
      text: "Burgerová žemľa, hovädzia placka, ľadový šalát, čerstvé paradajky, syr čedar, chrumkavá , červená cibuľa, ľadový šalát, majonéza, kečup, syrová omáčka",
      price: 9,
      basePrice: 9,
      grams: 300
    },
    {
      image: "11.png",
      title: "Cuketový burger",
      text: "Burgerová žemľa, vegetariánska cícerová placka, grilovaná cuketa, paradajka, nakladaná uhorka, syr, horčicová omáčka, kečup, bylinky",
      price: 8,
      basePrice: 8,
      grams: 320
    },
    {
      image: "12.png",
      title: "Double cheddar burger",
      text: "Burgerová žemľa, hovädzia placka, bôčik, červená cibuľa, nakladaná uhorka, paradajka, kečup, dvojitý syr čedar, horčica, bylinky.",
      price: 9,
      basePrice: 9,
      grams: 360
    },
  ];
  title: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  //title = 'burger';// delete
  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({ behavior: "smooth" });
    if (burger) {
      this.form.patchValue({product: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
    this.burgerMenuOpen = false;
  }

  confirmOrder() {
    if (this.form.valid) {
      this.form.reset();
    }
  }
  

  onSubmit() {
    if (this.form.valid) {

      this.appService.sendQuery(this.form.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
            },
            error: (response) => {
              alert(response.error.message);
            }
          }
        );
      this.form.reset({service: 'burger_any'});
    }
  }
  changeCurrency() {
    let newCurrency = "€";
    let coefficient = 1;
 if (this.currency === '€') {
      newCurrency = '$';
      coefficient = 1.1;
    } else if (this.currency === '$') {
      newCurrency = 'UAH';
      coefficient = 45.44;
    }else if (this.currency === "UAH") {
      newCurrency = "₽";
      coefficient = 100;
    }
    this.currency = newCurrency;
    this.productsData.forEach((item: any) =>{
      item.price = +(item.basePrice * coefficient).toFixed (1);
    })
  }
  onScrollToAnchor(how: string) {
    // this.scroller.scrollToAnchor(how);
    this.burgerMenuOpen = false;
  }

  burgerMenuClose() {
    this.burgerMenuOpen = false;

  }
  toggleBurgerMenuOpen() {
    this.burgerMenuOpen = !this.burgerMenuOpen;
    console.log('1')
  }
}
