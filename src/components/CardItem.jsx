import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';

const { Meta } = Card;

function CardItem({ cardItem, index }) {
  return (
    <Draggable draggableId={cardItem.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='trello-card-child'
        >
          <Card
            className='trello-card-item'
            cover={
              <img
                alt={cardItem.description}
                src={cardItem.image}
                height={160}
                width='100%'
              />
            }
          >
            <Meta
              title={cardItem.title}
              description={cardItem.description}
            />
          </Card>
        </div>
      )}
    </Draggable>
    
  )
}

export default CardItem