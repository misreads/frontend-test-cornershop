export const FETCH_COUNTERS_BEGIN = "FETCH_COUNTERS_BEGIN"
export const FETCH_COUNTERS_SUCCESS = "FETCH_COUNTERS_SUCCESS"
export const FETCH_COUNTERS_ERROR = "FETCH_COUNTERS_ERROR"
export const POST_COUNTER_INCREASE = "POST_COUNTER_INCREASE"
export const POST_COUNTER_DECREASE = "POST_COUNTER_DECREASE"
export const DELETE_COUNTER = "DELETE_COUNTER"
export const POST_NEW_COUNTER = "POST_NEW_COUNTER"

const baseUrl = "http://localhost:3000/api/v1/"

export function fetchAllCounters() {
  return dispatch => {
    dispatch(fetchCountersBegin())
    return fetch(baseUrl + "counters")
      .then(handleErrors)
      .then(res => res.json())
      .then(body => {
        dispatch(fetchCountersSuccess(body))
        return body
      })
      .catch(error => dispatch(fetchCountersError(error)))
  }
}

export function increaseCounter(id) {
  let body = {
    id: id
  }
  return dispatch => {
    return fetch(baseUrl + "counter/inc", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(body => {
        dispatch(postIncreaseCounter(body))
        return body
      })
      .catch(error => dispatch(fetchCountersError(error)))
  }
}

export function decreaseCounter(id) {
  let body = {
    id: id
  }
  return dispatch => {
    return fetch(baseUrl + "counter/dec", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(body => {
        dispatch(postDecreaseCounter(body))
        return body
      })
      .catch(error => dispatch(fetchCountersError(error)))
  }
}

export function createCounter(title) {
  let body = {
    title: title
  }
  return dispatch => {
    return fetch(baseUrl + "counter", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(body => {
        dispatch(postCreateCounter(body))
        return body
      })
      .catch(error => dispatch(fetchCountersError(error)))
  }
}

export function removeCounter(id) {
  let body = {
    id: id
  }
  return dispatch => {
    return fetch(baseUrl + "counter", {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(body => {
        dispatch(deleteCounter(body))
        return body
      })
      .catch(error => dispatch(fetchCountersError(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const fetchCountersBegin = () => ({
  type: FETCH_COUNTERS_BEGIN
})

export const fetchCountersSuccess = items => ({
  type: FETCH_COUNTERS_SUCCESS,
  payload: { items }
})

export const fetchCountersError = error => ({
  type: FETCH_COUNTERS_ERROR,
  payload: { error }
})

export const postIncreaseCounter = item => ({
  type: POST_COUNTER_INCREASE,
  payload: { item }
})

export const postDecreaseCounter = item => ({
  type: POST_COUNTER_DECREASE,
  payload: { item }
})

export const deleteCounter = item => ({
  type: DELETE_COUNTER,
  payload: { item }
})

export const postCreateCounter = item => ({
  type: POST_NEW_COUNTER,
  payload: { item }
})

// export const POST_COUNTER_MODIFY = "POST_COUNTER_MODIFY"

// export function modifyCounter(id, action) {
//   let body = {
//     id: id,
//     action: action
//   }
//   return dispatch => {
//     return fetch(baseUrl + "counter/" + action, {
//       method: "POST",
//       body: JSON.stringify(body),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then(handleErrors)
//       .then(res => res.json())
//       .then(body => {
//         console.log(body)
//         dispatch(postIncreaseCounter(body))
//         return body
//       })
//       .catch(error => dispatch(fetchCountersError(error)))
//   }
// }

// export const postModifyCounter = item => ({
//   type: POST_COUNTER_MODIFY,
//   payload: { item }
// })
