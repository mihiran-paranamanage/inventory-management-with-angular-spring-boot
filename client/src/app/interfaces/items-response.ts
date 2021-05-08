import {Item} from './item';

export interface ItemsResponse {
  id?: number;
  _embedded: {
    itemList: Item[];
    _links: {self: {href: string}};
  };
}
