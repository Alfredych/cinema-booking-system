import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoAdmin from '../assets/svg/logo_admin.svg';
import login from '../ui/login.js';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/admin');
    }
  }, [navigate]);

  const root = document.querySelector(':root');
  if (root) {
    root.classList.add('root__admin');
  }

  return (
    <div className="page">
      <header className="header">
        <Link to="/">
          <img src={logoAdmin} alt="home" />
        </Link>
      </header>

      <main className="login">
        <header className="login__header">Авторизация</header>
        <form className="login__form" onSubmit={event => login(event, navigate)}>
          <label className="admin__label login__label" htmlFor="email">E-mail</label>
          <input className="admin__input login__input" type="email" id="email" name="login" placeholder="example@mail.ru" required />
          <label className="admin__label login__label" htmlFor="password">Пароль</label>
          <input className="admin__input login__input" type="password" id="password" name="password" required />
          <div className="actions actions_login">
            <button className="btn_ok">Авторизоваться</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;