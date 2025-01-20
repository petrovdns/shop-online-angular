import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../models/res.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ''): Product[] {
    if(!productName.trim()) {
      return products;
    }

    return products.filter(product => {
      return product.title?.toLowerCase().includes(productName.toLowerCase());
    });
  }
}
