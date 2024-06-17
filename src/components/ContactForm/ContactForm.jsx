import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const phoneRegExp = /^\d{3}-\d{2}-\d{2}$/;
const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short! It needs 3 symbols")
    .max(50, "Too Long! It needs max 50 symbols")
    .required("Required"),

  number: Yup.string()
    .matches(
      phoneRegExp,
      "Phone number is not valid. Enter number in format XXX-XX-XX"
    )
    .required("Phone number is required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();
  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={phoneFieldId}>Number</label>
          <Field
            className={css.field}
            type="tel"
            name="number"
            id={phoneFieldId}
          />
          <ErrorMessage name="number" component="span" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
