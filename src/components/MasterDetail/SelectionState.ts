export interface SelectionState {
  /** is a new item being created (i.e. it doesn't have an id yet) */
  isNew: boolean;

  /** selected item's id (empty string for a new item) */
  itemId: string;

  /**
   * Child components have the ability to tell the parent that the selected
   * item has been updated. This causes the version number in the state
   * to be incremented resulting in the creation of a new detail component.
   * This is important to erase any stale state held in the detail component.
   */
  version: number;
}
