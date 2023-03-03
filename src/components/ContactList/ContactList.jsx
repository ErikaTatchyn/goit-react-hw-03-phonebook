import PropTypes from 'prop-types';
import s from './ContactList.module.css';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.item} key={id}>
          <span>{name}:</span>
          <span>{number}</span>
          <button
            className={s.button}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
