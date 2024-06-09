import React from 'react'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import { useAppContext } from '../context/AppContext';

const { Meta } = Card;

function CardItem({ cardItem, index }) {

  const { deleteItem } = useAppContext();

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
            actions={[
              <EyeOutlined key="eye"  />,
              <DeleteOutlined key="delete" onClick={() => deleteItem(cardItem.id)} />
            ]}
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