import { SelectionState } from './SelectionState';

export interface MasterDetailChildProps {
  selectionState: SelectionState;

  // Requests parent to start the creation of a new item.
  // Parent changes selectionState to:
  // {
  //    isNew: true
  //    itemId: ''
  //    version: 0
  // }
  onStartNewItem: () => void;

  // Informs parent that an existing item has been selected.
  // Parent changes selectionContext to:
  // {
  //    isNew: false
  //    itemId: itemId
  //    version: 0
  // }
  onItemSelected: (itemId: string) => void;

  // Informs parent that an existing item has been updated.
  // Parent changes selectionContext to:
  // {
  //    isNew: false
  //    itemId: itemId
  //    version: version + 1
  // }
  onItemUpdated: () => void;
}
