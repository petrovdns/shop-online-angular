import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs';
import {fbDbProduct, Product} from '../../models/res.model';


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

  getAll() {
    return this.http.get<Record<string, any>>(`${environment.fbDbUrl}/products.json`)
      .pipe( map( res => {
        return Object.keys(res)
          .map( key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }) )
  }

  getById(id: string) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe( map( (res: Product) => {
        return {
            ...res,
            id,
            date: res.date ? new Date(res.date) : null
          }
      }))
  }

}
