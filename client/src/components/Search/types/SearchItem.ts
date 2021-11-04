export type SearchItemType = 'user' | 'project' | 'task';

export default interface SearchItem {
  type: SearchItemType;
  id: number;
}
