import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs';
import {fbDbProduct} from '../../models/res.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: any) {
    return this.http.post<fbDbProduct>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map( (res: fbDbProduct) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date),
        }
      } ))
  }


}
