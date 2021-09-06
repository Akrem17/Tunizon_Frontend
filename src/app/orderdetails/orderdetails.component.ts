
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})

export class OrderdetailsComponent implements OnInit {

orderId: any;
products: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
  ) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.orderId = res['id'];
      this.getProducts();
    });
  }


async getProducts(event?: any) {
    if (event) {
      this.products = null;
    }
    try {
      const data = await this.rest.get(
        `http://localhost:3030/api/accounts/orders/${this.orderId}`);
      data['success']
            ? (this.products = data['order'])
            : this.data.error(data['message']);
     this.products=this.products.products;       
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
