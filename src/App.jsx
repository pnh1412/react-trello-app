import React, { useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import HeaderComponent from './components/Header';
import CardList from './components/CardList';
import { useAppContext } from './context/AppContext';



function App() {
  const { todos, onDragEnd } = useAppContext();
  
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
