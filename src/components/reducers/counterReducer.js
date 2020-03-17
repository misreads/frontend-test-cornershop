import {
  FETCH_COUNTERS_BEGIN,
  FETCH_COUNTERS_SUCCESS,
  FETCH_COUNTERS_ERROR,
  POST_COUNTER_INCREASE,
  POST_COUNTER_DECREASE,
  DELETE_COUNTER,
  POST_NEW_COUNTER
  //   POST_COUNTER_MODIFY
} from "../actions/counterActions"

const initialState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  firstLoading: true
}

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_COUNTERS_SUCCESS: {
      let items = action.payload.items
      let total = 0
      items.forEach(item => {
        total += item.count
      })
      return {
        ...state,
        loading: false,
        items: items,
        total: total,
        firstLoading: false
      }
    }

    case FETCH_COUNTERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      }

    case POST_COUNTER_INCREASE: {
      const { id, count } = action.payload.item
      let items = [...state.items]
      let counterInc = items.find(item => item.id === id)
      if (counterInc) {
        counterInc.count = count
      }
      let newTotal = state.total + 1
      return {
        ...state,
        items: items,
        total: newTotal
      }
    }

    case POST_COUNTER_DECREASE: {
      const { id, count } = action.payload.item
      let items = [...state.items]
      let counterInc = items.find(item => item.id === id)
      if (counterInc) {
        counterInc.count = count
      }
      let newTotal = state.total - 1
      return {
        ...state,
        items: items,
        total: newTotal
      }
    }

    case DELETE_COUNTER: {
      let id = action.payload.item
      let items = [...state.items]
      let itemToRemove = items.find(item => item.id === id)
      let newItems = items.filter(item => item.id !== id)
      let newTotal = state.total - itemToRemove.count
      return {
        ...state,
        items: newItems,
        total: newTotal
      }
    }

    case POST_NEW_COUNTER: {
      let newCounter = action.payload.item
      return {
        ...state,
        items: [...state.items, newCounter]
      }
    }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}

// case POST_COUNTER_MODIFY: {
//   const { id, count } = action.payload.item
//   console.log(id)
//   console.log(count)
//   let items = [...state.items]
//   let counterInc = items.find(item => item.id === id)
//   if (counterInc) {
//     counterInc.count = count
//   }
//   console.log(counterInc)
//   return {
//     ...state,
//     items: items
//   }
// }
