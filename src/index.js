import React from 'react';
import ReactDOM from 'react-dom';
const Axios = require('axios')
const Faker = require('faker')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      friends: []
    }
  }
  async componentDidMount () {
    try{
    const response = await Axios.get('api/friends')
    const friends = response.data;
    this.setState({friends: friends}) 
    } catch(err) {console.log(err)}
  }
  async createFriend() {
    const response = await Axios.post('api/friends')
    const newFriend = response.data
    const friendArray = this.state.friends;
    friendArray.push(newFriend);
    friendArray.sort((a,b) => b.rating - a.rating)
    this.setState({friends: friendArray}); 
  }
  async deleteFriend(id) {
    await Axios.delete(`api/friends/${id}`)
    const friends = this.state.friends.filter(friend => friend.id !== id)
    this.setState({friends: friends})
  }
  async ratingChange(id, rating, method) {
    method === 'plus' ? rating +=1 : rating -=1
    await Axios.put(`/api/friends/${id}`, { rating: rating })
    const friendArray = this.state.friends;
    const friend = friendArray.find(item => item.id === id);
    friend.rating = rating;
    friendArray.sort((a,b) => b.rating - a.rating)
    this.setState({friends: friendArray}); 
  }
  render() {
    return( 
    <div>
    <h1>Friends (The List)</h1>
    <button onClick = {() => this.createFriend()}>Create Friend</button>
    <div id='error'></div>
    <ul>
      {
      this.state.friends.map(friend => {
        return ( 
        <li key={friend.id}>
        <h2>{ friend.name }</h2>
        <span>{ friend.rating }</span>
        <button onClick = {() => this.ratingChange(friend.id, friend.rating, 'plus')}>+</button>
        <button onClick = {() => this.ratingChange(friend.id, friend.rating, 'minus')}>-</button>
        <button onClick = {() => this.deleteFriend(friend.id)}>x</button>
        </li>)
      })
      }
    </ul>
    </div>
  )}
}

ReactDOM.render(<App />, document.getElementById("root"))

const axios = require('axios');
const { render } = require('react-dom');