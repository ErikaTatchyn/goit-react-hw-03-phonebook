import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import styles from './App.module.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2 className={styles.heading}>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <div>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </div>
        ) : (
          <p>Your phonebook is empty. Please add contacts.</p>
        )}
      </div>
    );
  }
}

export default App;
