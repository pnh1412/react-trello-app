import React, { useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import HeaderComponent from './components/Header';
import CardList from './components/CardList';

import { dataSource } from './mocks/data';

function App() {
  const [todos, setTodos] = React.useState(dataSource);

  // using useCallback is optional
  // const onDragStart = useCallback(() => {
  //   /*...*/
  //   console.log("onDragStart")
  // }, []);
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

  console.log("App", {
    todos
  })


  return (
    <>
      <HeaderComponent />

      <main>
        <div className='trello-container'>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <Droppable 
            droppableId="LIST" 
            direction="horizontal" 
            type="LIST"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                className='listContainer'
                {...provided.droppableProps}
              >
                <>
                  {todos.columns.map((list, listIndex) => {
                    const cardList = todos.lists[list];
                    const cards = cardList.cards;
                 
                    return (
                      <CardList 
                        key={cardList.id}
                        index={listIndex} 
                        cardList={cardList}
                        cards={cards}
                      />
                    )
                  })}
                </>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
          
        </div>
      </main>
    </>
  )
}

export default App
