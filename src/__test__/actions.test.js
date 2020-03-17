import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import fetchMock from "fetch-mock"

import {
  FETCH_COUNTERS_BEGIN,
  FETCH_COUNTERS_SUCCESS,
  FETCH_COUNTERS_ERROR,
  POST_COUNTER_INCREASE,
  POST_COUNTER_DECREASE,
  DELETE_COUNTER,
  POST_NEW_COUNTER,
  fetchAllCounters
  //   POST_COUNTER_MODIFY
} from "../components/actions/counterActions"

import {
  fetchCountersBegin,
  fetchCountersSuccess,
  fetchCountersError,
  postIncreaseCounter,
  postDecreaseCounter,
  deleteCounter,
  postCreateCounter,
  increaseCounter
} from "../components/actions/counterActions"

const counter = {
  id: "fakeId",
  title: "fakeTitle",
  count: 0
}

const listCounter = [
  {
    id: "fakeId_1",
    title: "fakeTitle_1",
    count: 0
  },
  {
    id: "fakeId_2",
    title: "fakeTitle_2",
    count: 42
  }
]

const listCounterInc = [
  {
    id: "fakeId_1",
    title: "fakeTitle_1",
    count: 1
  },
  {
    id: "fakeId_2",
    title: "fakeTitle_2",
    count: 42
  }
]

const listCounterDec = [
  {
    id: "fakeId_1",
    title: "fakeTitle_1",
    count: 0
  },
  {
    id: "fakeId_2",
    title: "fakeTitle_2",
    count: 41
  }
]

const listCounterCreate = [
  {
    id: "fakeId_1",
    title: "fakeTitle_1",
    count: 0
  },
  {
    id: "fakeId_2",
    title: "fakeTitle_2",
    count: 42
  },
  {
    id: "fakeId_3",
    title: "fakeTitle_3",
    count: 314
  }
]

const listCounterDelete = [
  {
    id: "fakeId_1",
    title: "fakeTitle_1",
    count: 0
  }
]

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Increase Counter", () => {
  it("action to increase count of a counter", () => {
    let item = counter
    const expectedAction = {
      type: POST_COUNTER_INCREASE,
      payload: { item }
    }
    expect(postIncreaseCounter(item)).toEqual(expectedAction)
  })
})

describe("Decrease Counter", () => {
  it("action to increase count of a counter", () => {
    let item = counter
    const expectedAction = {
      type: POST_COUNTER_DECREASE,
      payload: { item }
    }
    expect(postDecreaseCounter(item)).toEqual(expectedAction)
  })
})

describe("Delete Counter", () => {
  it("action to delete a counter", () => {
    let item = counter
    const expectedAction = {
      type: DELETE_COUNTER,
      payload: { item }
    }
    expect(deleteCounter(item)).toEqual(expectedAction)
  })
})

describe("Create Counter", () => {
  it("action to delete a counter", () => {
    let item = counter
    const expectedAction = {
      type: POST_NEW_COUNTER,
      payload: { item }
    }
    expect(postCreateCounter(item)).toEqual(expectedAction)
  })
})

describe("Async Fetch Counters", () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it("creates FETCH_COUNTERS_SUCCESS when fetching counters has been done", () => {
    const items = listCounter
    fetchMock.getOnce("", {
      body: items,
      headers: { "Content-Type": "application/json" }
    })

    const expectedActions = [
      { type: FETCH_COUNTERS_BEGIN },
      { type: FETCH_COUNTERS_SUCCESS, payload: { items } }
    ]
    const store = mockStore({ counter: [] })

    return store.dispatch(fetchAllCounters()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
