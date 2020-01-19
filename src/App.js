import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from './components/Header'
import Home from './components/Home'
import Page404 from './components/Page404'
import Profile from'./components/Profile'

class App extends Component {

  state = {
    isLoggedIn: window.localStorage?.isLogged, // user should stay whole time logged so localstorage can simulate that
    recievedData: []
  }
  

  componentDidMount () {
// Create WebSocket connection.
    this.socket = new WebSocket('wss://api-pub.bitfinex.com/ws/1');

    // Connection opened
    this.socket.onopen =  (event) => {
      const symbols = ['BTCUSD', 'BTCEUR', 'ETHUSD', 'ETHEUR', 'EOSUSD']
      const msg = symbols.map(item => ({
        event: 'subscribe',
        channel: 'ticker',
        symbol: item
      }))
      msg.forEach(element => {
        this.socket.send(JSON.stringify(element))
      })
    }

    // Listen for messages
    this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const pairValues = !Array.isArray(data) ? (data.event === 'subscribed' && data.pair) : data

        pairValues && (
          !(+pairValues[0])
          //Initial set
            ? this.setState((prev) => ({
                recievedData: prev.recievedData.concat({
                  pair: pairValues,
                  chanId: data.chanId,
                  values: []
                })
              }))
          //Update values
            : pairValues.length > 2 && this.setState((prev) => ({
                recievedData: prev.recievedData.map((item, index) => ({
                  ...item,
                  values: pairValues[0] === item.chanId
                   ? ({
                     dailyChange: pairValues[5],
                     lastPrice: pairValues[7],
                     volume: pairValues[8]
                   }) 
                   : prev.recievedData[index].values
                }))
              }))
          )
      }
  }

  componentWillUnmount () {
    this.socket.close()
  }

  handleLogin = (bool) => {
    this.setState({
      isLoggedIn: bool
    })
    window.localStorage.setItem('isLogged', true)
  }

  render () {
    return (
      <Router>
        <div className="App">
          <Header handleLogin={this.handleLogin}  isUserLoggedIn={this.state.isLoggedIn}/>
          {/* body */}
          <div className="Body">
            <Switch> 
              <Route path="/" exact render={(props) => 
                <Home {...props}  data={this.state.recievedData} />
                    }/>
              { this.state.isLoggedIn &&  (
              <Route path="/profile" component={Profile}/>)}            
              <Route component={Page404} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
