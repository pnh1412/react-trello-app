import React, { useCallback } from 'react';

const AppContext = React.createContext();

import { dataSource } from '../mocks/data';

export default  function AppProvider({ children }) {
  const [todos, setTodos] = React.useState(dataSource);

  // using useCallback is optional
  const onDragEnd = useCallback((result) => {
    const { source, destination, type } = result;
    if(!destination) return;

    const { index: destinationIndex, droppableId: destinationDroppableId } = destination;
    const { index: sourceIndex, droppableId: sourceDroppableId } = source;

    const isSamePosition = sourceIndex === destinationIndex;
    const isSameDropArea = sourceDroppableId === destinationDroppableId;

    if(isSamePosition && isSameDropArea) return;

    console.log("onDragEnd", {
      type,
      source, 
      destination,
      result
  })

    // LIST
    if(type === 'LIST') {
      const newColumns = [...todos.columns];

      // way 1
      const { draggableId } = result;
      newColumns.splice(sourceIndex, 1);
      newColumns.splice(destinationIndex, 0, draggableId);

      // way 2
      // const [listRemoved] = newColumns.splice(sourceIndex, 1);
      // newColumns.splice(destinationIndex, 0, listRemoved);

      setTodos(prevState => ({
        ...prevState,
        columns: newColumns
      }))
      
    }

    // CARD
    if(type === 'CARD') {
       // drag & drop card in same list
      if(sourceDroppableId === destinationDroppableId) {
        const lists = todos.lists[destinationDroppableId];
        const newCards = [...lists.cards];
        // swap item 
        // [newCards[sourceIndex], newCards[destinationIndex]] = [newCards[destinationIndex], newCards[sourceIndex]]
        //     // 0                               2              =          2                         0
        
        // push & pop
        // remove source position -> newCards.splice(sourceIndex, 1)
        // push item removed into destination position -> newCards.splice(destinationIndex, 0, newItem)
        const [cardRemoved] = newCards.splice(sourceIndex, 1);
        newCards.splice(destinationIndex, 0, cardRemoved);
        setTodos(prevState => ({
          ...prevState,
          lists: {
            ...prevState.lists, // copy properties of lists
            /* [destinationDroppableId] -> list1
              list1: {
                ...prevState.lists[list1], // ...prevState.lists[destinationDroppableId],
                cards: newCards
              }
            */
            [destinationDroppableId]: {
              ...prevState.lists[destinationDroppableId],
              cards: newCards
            }
          }
        }))
      } else {
        // TODO: drag & drop card in different list 
      }
    }
  }, [todos]);

  function deleteItem(cardId) {
    console.log('deleteItem:', cardId)
  }

  return (
    <AppContext.Provider
      value={{
        todos,
        onDragEnd,
        deleteItem
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


export const useAppContext = () => React.useContext(AppContext)