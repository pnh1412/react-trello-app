import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Card, Tooltip, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import CardItem from './CardItem';
import { dataSource } from '../mocks/data';

function CardList({ cardList, cards, index }) {
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
            type="CARD_ITEM"
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
                        <Button shape="circle" icon={<DeleteOutlined />} />
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
                      console.log('cardId: ', cardIndex)
                      return (
                        <CardItem
                          key={cardItem.id}
                          index={cardIndex}
                          cardItem={cardItem}
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