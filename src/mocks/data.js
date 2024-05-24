// hash object
export const dataSource =  {
  columns: ['list1', 'list2'],
  lists: {
    'list1': {
      id: 'list1',
      title: 'list-1',
      cards: ['card-1-list1', 'card-2-list1']
    },
    'list2': {
      id: 'list2',
      title: 'list-2',
      cards: ['card-1-list2']
    }
  },
  cards: {
    'card-1-list1': {
      id: 'card-1-list1',
      title: 'card 1 of list 1',
      description: 'card 1 of list 1',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    'card-2-list1': {
      id: 'card-2-list1',
      title: 'card 2 of list 1',
      description: 'card 2 of list 1',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    },
    'card-1-list2': {
      id: 'card-1-list2',
      title: 'card 1 of list 2',
      description: 'card 1 of list 2',
      image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
    }
  }
}

// source = list1
// destination = list2

// get list1: lists[source]
// get list2: lists[destination].cards = newCards


// source, destination
// loop find card of list source
// loop find list source, find list destination
// add card in list destination
// remove card in list source