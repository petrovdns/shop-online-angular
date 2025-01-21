export interface fbDbProduct {
  name: string;
}

export interface Product {
  type?: string;
  id?: string;
  title?: string;
  photo?: string;
  info?: string;
  price?: string;
  date?: Date | null;
}

export interface Orders {
  title: string;
  id?: string;
  name?: string;
  address?: string;
  phone?: string;
  orders?: Orders[];
  payment?:string;
  price?: string;
  date?: Date | null;
}
