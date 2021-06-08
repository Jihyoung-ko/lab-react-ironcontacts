import contacts from './contacts.json';
import './App.css';
import React, { Component } from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitedContacts: contacts.slice(0,5)
    };
    console.log(this.state.limitedContacts);
  }
  

  addContactHandler = () => {
    const {limitedContacts} =this.state;

    const randomContact = contacts[Math.floor(Math.random() * (contacts.length - 5) + 5)];
    const addedContacts = [...limitedContacts];
    addedContacts.push(randomContact);
    this.setState({
      limitedContacts: addedContacts
    })
    console.log(randomContact);
  }

  sortByName = () => {
    const {limitedContacts} =this.state;
    const sortedContacts = [...limitedContacts];
    sortedContacts.sort((a,b) => {
      return a.name > b.name ? 1 : -1;
    })
    this.setState({
      limitedContacts: sortedContacts
    })
  }

  sortByPopularity = () => {
    const {limitedContacts} =this.state;
    const sortedContacts = [...limitedContacts];
    sortedContacts.sort((a,b) => {
      return a.popularity < b.popularity ? 1 : -1;
    })
    this.setState({
      limitedContacts: sortedContacts
    })
  }

  deleteContactHandler = (id) => {
    const {limitedContacts} =this.state;
    const contactsCopy = [...limitedContacts];
    const remainingContacts = contactsCopy.filter(contact => id !== contact.id);
    this.setState({
      limitedContacts: remainingContacts
    })
    console.log(remainingContacts);
  }

  render() { 
    const {limitedContacts} =this.state;

    return (   
      <div className="App">
        <h1>IronContacts</h1>
        <button className="btn" onClick={this.addContactHandler}>Add Random Contact</button>
        <button className="btn" onClick={this.sortByName}>Sort by name</button>
        <button className="btn" onClick={this.sortByPopularity}>Sort by popularity</button>
        <table>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Action</th>
          </tr>
          {
            limitedContacts.map(contact => {
              return (
                <tr key={contact.id}>
                  <td><img src={contact.pictureUrl} alt={contact.name} style={{width:"50px", margin:"5px"}} /></td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity.toFixed(2)}</td>
                  <td><button className="btn btn-light" onClick={()=> this.deleteContactHandler(contact.id)}>Delete</button></td>
                </tr>
              )
            })
          }
        </table>
      </div>
    );
  }
  
}

export default App;
