import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export function SignInPage() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      // credentialResponse.credential - это Google JWT токен
      const googleToken = credentialResponse.credential;

      // Отправляем Google токен на бэк
      const res = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: googleToken
        })
      });

      if (!res.ok) {
        throw new Error('Ошибка авторизации');
      }

      // Получаем наш кастомный JWT от бэка
      const data = await res.json();

      // Сохраняем токен
      sessionStorage.setItem('authToken', data.accessToken);
      sessionStorage.setItem('userEmail', data.user.email);

      // Редирект на главную
      navigate('/dashboard');

    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Не удалось войти: ' + error.message);
    }
  };

  const handleError = () => {
    console.error('Ошибка Google Sign-In');
    alert('Не удалось войти через Google');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '20px'
    }}>
      <h1>Вход в CRM систему</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text="continue_with"
        size="large"
        width="300"
      />
    </div>
  );
}