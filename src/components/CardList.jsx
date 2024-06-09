import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Card, Tooltip, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import CardItem from './CardItem';
import { dataSource } from '../mocks/data';
import { useAppContext } from '../context/AppContext';

function CardList({ cardList, cards, index }) {
  const { deleteList } = useAppContext();
  return (
    <Draggable draggableId={cardList.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='trello-content'
        >
          <Droppable 
            droppableId={cardList.id} 
            type="CARD"
          >
            {(provided, snapshot) => (
                <Card 
                  title={cardList.title}
                  className='trello-card-list'
                  extra={
                    <Space gutter={2}>
                    <Tooltip title="Add">
                        <Button shape="circle" icon={<PlusOutlined />} />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button shape="circle" icon={<DeleteOutlined />} onClick={() => deleteList(cardList.id)} />
                      </Tooltip>
                    </Space>
                  }
                >
                  <div
                    ref={provided.innerRef}
                    // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                    {...provided.droppableProps}
                    className='trello-list-container'
                  >
                    {cards.map((cardId, cardIndex) => {
                      const cardItem = dataSource.cards[cardId];
                      return (
                        <CardItem
                          key={cardItem.id}
                          index={cardIndex}
                          cardItem={cardItem}
                          listId={cardList.id}
                        />
                      )
                    })}
                  </div>
                  {provided.placeholder}
                
                </Card>
                
            )}
          </Droppable>
          
          
        </div>
      )}
    </Draggable>
   
  )
}

export default CardList