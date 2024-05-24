import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
const Login = () => {
  const [value, setValue] = useState('');
  console.log(value.toString());
  return (
    <div>
      <h1>Login modal</h1>
    </div>
  );
};

export default Login;
