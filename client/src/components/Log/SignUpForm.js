import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  pseudo: Yup.string()
    .min(3, 'Doit contenir 3 caractères minimum')
    .max(30, 'Doit contenir 30 caractères ou moins')
    .required('Champ requis !'),
  email: Yup.string()
    .email('Veuillez renseigner un e-mail valide')
    .matches(/[A-Za-z]\.com|.fr$/, 'doit contenir .com ou .fr à la fin')
    .required('Champ requis !'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/,
      'doit contenir 8 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial'
    )
    .required('Champ requis !'),
  confirmPassword: Yup.string()
    .required('Veuillez confirmer votre mot de passe')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Le mot de passe ne correspond pas'
      ),
    }),
});

const SignUpForm = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;

    const response = await axios
      .post(`${process.env.REACT_APP_API_URL}api/user/register`, data)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        setSuccess(null);
      });
    if (response && response.data) {
      setError(null);
      setSuccess(true);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      {success ? (
        <>
          <SignInForm />
          <div></div>
          <h4 className="success">
            Inscription validée, vous n'avez plus qu'à vous connecter !
          </h4>
        </>
      ) : (
        <form action="" onSubmit={formik.handleSubmit} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pseudo}
          ></input>
          {formik.touched.pseudo && formik.errors.pseudo ? (
            <p>{formik.errors.pseudo}</p>
          ) : null}
          <div className="pseudo error"></div>

          <br />

          <label htmlFor="email">Email</label>
          <br />

          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          ></input>
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
          <div className="email error"></div>
          <br />

          <label htmlFor="password">Mot de passe</label>
          <br />

          <input
            type="text"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          ></input>
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
          <div className="password error"></div>
          <br />

          <label htmlFor="password">Confirmez votre mot de passe</label>
          <br />

          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          ></input>
          <br />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p>{formik.errors.confirmPassword}</p>
          ) : null}
          <br />
          <input type="submit" disabled={!formik.isValid} value="S'inscrire" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
