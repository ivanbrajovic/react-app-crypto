import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class Home extends Component {
   
  state = {
    tableLables: ['#', 'Symbol', 'Daily change', 'Volume', 'Last price']
  }

  render () {
    return (
      <div className="Home">
        <Table celled>
          <Table.Header>
            <Table.Row>
              { this.state.tableLables.map((item, index) => (
                <Table.HeaderCell key={`label-${index}`}>{ item }</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
          { this.props.data.map((item, index) => (
            <Table.Row key={`table-row-${index}`}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.pair}</Table.Cell>
              <Table.Cell>{item.values.dailyChange}</Table.Cell>
              <Table.Cell>{item.values.volume}</Table.Cell>
              <Table.Cell>{item.values.lastPrice}</Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default  Home
