// Contains all the custom types we want to use for our application
import NewReleases from "./assets/images/categories/new releases.jpg";
import BestSellers from "./assets/images/categories/fantasy.jpg";
import AwardWinners from "./assets/images/categories/mystery.jpg";
import EditorsChoice from "./assets/images/categories/romance.jpg";
import CelebrityPicks from "./assets/images/categories/romance.jpg";

export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  categoryId:number;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
  url: string;
}
export const categoryImages: Record<string, any> = {
  new_releases: NewReleases,
  best_sellers: BestSellers,
  award_winners: AwardWinners,
  editors_choice: EditorsChoice,
  celebrity_picks: CelebrityPicks,
};

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id: number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState: ShoppingCartItem[] = [];

export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}
export interface Customer {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpDate: number;
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}

export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface OrderDetails {
  order: Order;
  customer: Customer;
  books: BookItem[];
  lineItems: LineItem[];
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}