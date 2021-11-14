import { SearchItemType } from './SearchItem'

export default interface ItemClickData {
  id: number;
  value: string;
  type: SearchItemType;
}
