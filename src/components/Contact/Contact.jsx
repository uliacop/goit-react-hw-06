import css from "./Contact.module.css";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <div>
        <div className={css.user}>
          <div className={css.userIcon}>
            <FaUser />
          </div>
          <p className={css.userName}>{name}</p>
        </div>
        <div className={css.user}>
          <div className={css.phone}>
            <FaPhoneAlt />
          </div>
          <p className={css.phone}>{number}</p>
        </div>
      </div>

      <button
        className={css.button}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </div>
  );
}
