import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ProductService} from '../product.service';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {

  type = '';

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {}

  setType(type: string): void {
    if (this.type !== 'Cart') {
      this.type = type;
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });
    }
    this.productService.setType(type);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
    });
    if(this.type === undefined){
      this.type = 'Phone';
      this.router.navigate([],  {
        queryParams: {
          type: this.type
        }
      });
    }
    console.log(this.type);
    this.productService.setType(this.type);
  }
}
