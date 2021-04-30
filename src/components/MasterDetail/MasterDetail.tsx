import React, { useState } from 'react';
import {
  HorizontalContainer,
  ScrollingContainer,
  VerticalContainer,
} from '../Containers';
import { MasterDetailChildProps } from './MasterDetailChildProps';
import { SelectionState } from './SelectionState';

/**
 * The MasterDetail component has two children - Master and Detail. Both
 * children can display one or more entities.
 *
 * MasterDetail has the concept of selection - you can have zero selections
 * or one selection.
 *
 * Zero selections is generally the case when a new item is being created
 * that does not have an id yet. In this case, the selectionState will have
 * the following value:
 * {
 *     isNew: true
 *     itemId: ''
 *     version: 0
 * }
 *
 * When an existing item is selected, the selectionState will have the
 * following value:
 * {
 *     isNew: false
 *     itemId: existing item's id
 *     version: 0..n
 * }
 *
 * The selectionState is passed to child components so that they can
 * control their presentation and behavior. Child components should never
 * change the selectionState directly. In order to change it, they can call
 * the appropriate callbacks.
 *
 * Each child component has the ability to change the selected item by calling
 * onItemSelected(). For example, the Master can select an item when the
 * item is selected from a list. The Detail can select an item when it
 * creates a new one and wants it to be the selected one. Note that the
 * selected item must always have an id, so an id must be assigned to it
 * before selection (e.g. by saving it in the database).
 *
 * MasterDetail component can also initiate the creation of a new item
 * using an optional Add button.
 */

export interface MasterDetailProps {
  MasterComponent: React.FC<MasterDetailChildProps>;
  DetailComponent: React.FC<MasterDetailChildProps>;
  masterContainerClassName: string;
  detailContainerClassName: string;
}

export function MasterDetail({
  MasterComponent,
  DetailComponent,
  masterContainerClassName,
  detailContainerClassName,
}: MasterDetailProps) {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    isNew: true,
    itemId: '',
    version: 0,
  });

  const handleStartNewItem = () => {
    setSelectionState({
      isNew: true,
      itemId: '',
      version: 0,
    });
  };

  const handleItemSelected = (itemId: string) => {
    setSelectionState({ isNew: false, itemId, version: 0 });
  };

  const handleItemUpdated = () => {
    const { itemId, version } = selectionState;
    setSelectionState({ isNew: false, itemId, version: version + 1 });
  };

  const handleAddButtonClicked = () => {
    handleStartNewItem();
  };

  return (
    <VerticalContainer className="min-h-0">
      <div className="flex justify-end m-1">
        <button className="btn-sm" onClick={handleAddButtonClicked}>
          Add
        </button>
      </div>

      <HorizontalContainer className="min-h-0">
        <ScrollingContainer
          data-testid="master-container"
          className={masterContainerClassName}
        >
          <MasterComponent
            selectionState={selectionState}
            onStartNewItem={handleStartNewItem}
            onItemSelected={handleItemSelected}
            onItemUpdated={handleItemUpdated}
          />
        </ScrollingContainer>
        <ScrollingContainer
          data-testid="detail-container"
          className={detailContainerClassName}
        >
          <DetailComponent
            key={`${selectionState.itemId}-${selectionState.version}`}
            selectionState={selectionState}
            onStartNewItem={handleStartNewItem}
            onItemSelected={handleItemSelected}
            onItemUpdated={handleItemUpdated}
          />
        </ScrollingContainer>
      </HorizontalContainer>
    </VerticalContainer>
  );
}
