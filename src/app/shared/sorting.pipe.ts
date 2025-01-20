import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../models/res.model';

@Pipe({
  name: 'sorting',
  standalone: true
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type = ''): Product[] {
      return products.filter(product => {
      return product.type === type;
    });
  }

}
