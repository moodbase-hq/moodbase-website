import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ text, type = 'primary', to, onClick }) => {
  const btnClass = `${styles.base} ${styles[type]}`;

  if (to) {
    return (
      <Link to={to} className={btnClass}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={btnClass}>
      {text}
    </button>
  );
};

export default Button;