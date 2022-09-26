import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignInForm = () => {
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().required('Veuillez renseigner votre e-mail'),
    password: Yup.string().required('Veuillez renseigner votre mot de passe'),
  });

  const onSubmit = async (values) => {
    setError(null);
    const emailError = document.querySelector('.email-error');
    const passwordError = document.querySelector('.password-error');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/user/login`,
        {
          method: 'post',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      const data = await response.json();
      console.log('from login : ', data);

      if (data.error) {
        emailError.innerHTML = data.error;
        passwordError.innerHTML = data.error;
      } else {
        window.location = '/';
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <form action="" onSubmit={formik.handleSubmit} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />

      <input
        type="text"
        name="email"
        id="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <p>{formik.errors.email}</p>
      ) : (
        ''
      )}

      <div className="email-error"></div>
      <br />

      <label htmlFor="password">Mot de passe</label>
      <br />

      <input
        type="password"
        name="password"
        id="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <p>{formik.errors.password}</p>
      ) : (
        ''
      )}

      <div className="password-error"></div>
      <br />
      <input type="submit" disabled={!formik.isValid} value="Se connecter" />
      <br />
      <p>{error ? error : ''}</p>
    </form>
  );
};

export default SignInForm;
