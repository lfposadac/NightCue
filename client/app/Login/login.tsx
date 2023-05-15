import axios from 'axios';
import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/sign-in', {
        email,
        password,
      });

      // Aquí puedes almacenar el JWT que recibes en la respuesta
      const token = response.data.token;

      // Aquí puedes redirigir al usuario a la página de inicio
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
