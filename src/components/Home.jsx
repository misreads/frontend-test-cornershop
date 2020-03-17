import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import ReactTable from "react-table-v6"
import "react-table-v6/react-table.css"
import {
  fetchAllCounters,
  increaseCounter,
  decreaseCounter,
  removeCounter,
  createCounter
} from "./actions/counterActions"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newCounter: null,
      customFilter: 0
    }
  }

  componentDidMount() {
    if (this.props.firstLoading) {
      this.props.dispatch(fetchAllCounters())
    }
  }

  handleInputChange = e => {
    this.setState({
      newCounter: e.target.value
    })
  }

  handleInputFilterChange = e => {
    this.setState({
      customFilter: e.target.value
    })
  }

  onHandleSubmit = e => {
    e.preventDefault()
    const newCounter = this.state.newCounter
    this.props.dispatch(createCounter(newCounter)).then(
      this.setState({
        newCounter: null
      })
    )
    e.target.reset()
  }

  render() {
    const { error, loading, counters } = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    const cols = [
      {
        Header: "Id",
        accessor: "id"
      },
      { Header: "Title", accessor: "title" },
      {
        Header: "Counter",
        accessor: "count",
        id: "over",
        Footer: (
          <span>
            <strong>Total: {this.props.total}</strong>
          </span>
        ),
        filterMethod: (filter, row) => {
          if (filter.value === "greater") {
            return row[filter.id] >= this.state.customFilter
          }
          if (filter.value === "less") {
            return row[filter.id] < this.state.customFilter
          }
          if (filter.value === "all") {
            return true
          }
        },
        Filter: ({ filter, onChange }) => (
          <div className='row'>
            <div className='col s6 m6 l6'>
              <input
                className='form-control'
                type='number'
                onChange={this.handleInputFilterChange}
                placeholder='Filter'
              />
            </div>
            <div className='col s6 m6 l6'>
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
                className='browser-default'
              >
                <option value='all'>Show All</option>
                <option value='greater'>Greater than</option>
                <option value='less'>Less than</option>
              </select>
            </div>
          </div>
        )
      },
      {
        Header: () => (
          <Fragment>
            <div className='row'>
              <form onSubmit={e => this.onHandleSubmit(e)}>
                <div className='col s8 m8 l8'>
                  <input
                    className='form-control'
                    type='text'
                    onChange={this.handleInputChange}
                    placeholder='New counter i.e. John'
                  />
                </div>
                <div className='col s4 m4 l4'>
                  <button
                    type='submit'
                    disabled={!this.state.newCounter ? true : false}
                    className='waves-effect waves-light btn-floating z-depth-2 blue vhcenter'
                  >
                    <i className='material-icons'>add</i>
                  </button>
                </div>
              </form>
            </div>
          </Fragment>
        ),
        filterable: false,
        sortable: false,
        accessor: "id",
        Cell: ({ value }) => (
          <div className='row'>
            <div className='col s4 m4 l4'>
              <button
                className='waves-effect waves-light btn-floating z-depth-2 blue'
                onClick={() => {
                  console.log(value, "inc")
                  this.props
                    .dispatch(increaseCounter(value))
                    .then(() => console.log(counters))
                }}
              >
                <i className='material-icons'>add</i>
              </button>
            </div>
            <div className='col s4 m4 l4'>
              <button
                className='waves-effect waves-light btn-floating z-depth-2 blue'
                onClick={() => {
                  console.log(value, "dec")
                  this.props
                    .dispatch(decreaseCounter(value))
                    .then(() => console.log(counters))
                }}
              >
                <i className='material-icons'>remove</i>
              </button>
            </div>
            <div className='col s4 m4 l4'>
              <button
                className='waves-effect waves-light btn-floating z-depth-2 red'
                onClick={() => {
                  console.log(value, "remove")
                  this.props
                    .dispatch(removeCounter(value))
                    .then(() => console.log(counters))
                }}
              >
                <i className='material-icons'>delete</i>
              </button>
            </div>
          </div>
        )
      }
    ]
    return (
      <div className='container'>
        <br />
        <ReactTable
          className='-striped -highlight'
          data={counters}
          loading={loading}
          columns={cols}
          minRows='1'
          //   showPaginationTop={true}
          filterable={true}
          resizable={false}
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center"
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  counters: state.counter.items,
  loading: state.counter.loading,
  error: state.counter.error,
  firstLoading: state.counter.firstLoading,
  total: state.counter.total
})

export default connect(mapStateToProps)(Home)
