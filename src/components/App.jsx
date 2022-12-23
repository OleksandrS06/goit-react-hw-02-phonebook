import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Form from './ContactAddForm/ContactAddForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFilterChange = e => {
    const { value } = e.currentTarget;
    this.setState({
      filter: value,
    });
  };
  filteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  handleSubmit = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    const nameDuplicationCheck = contacts.find(contact => {
      return contact.name === name;
    });
    const numberDuplicationCheck = contacts.find(contact => {
      return contact.number === number;
    });
    if (nameDuplicationCheck) {
      alert(`Name ${name} is already exist`);
      return;
    } else if (numberDuplicationCheck) {
      alert(`Telephone number ${number} is already exist`);
      return;
    }
    let id = nanoid();
    const dataObject = {
      id: id,
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, dataObject],
    }));
  };
  deleteBtnHandler = id => {
    const { contacts } = this.state;
    const remainingNamesArray = contacts.filter(contact => {
      return contact.id !== id;
    });
    this.setState({ contacts: remainingNamesArray });
  };

  render() {
    const { filter } = this.state;
    return (
      <div className="wrapper">
        <h1 className="heading">Phonebook</h1>
        <Form onSubmit={this.handleSubmit} />
        <h2>Find Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />

        <ContactsList
          filtered={this.filteredContacts()}
          deleteBtHandler={this.deleteBtnHandler}
        />
      </div>
    );
  }
}
