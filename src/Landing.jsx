import  { useEffect, useState } from "react";
import "./Landing.css"; // aquí metemos los estilos tal cual del <style> que tenías

const Landing = () => {
  const targetDate = new Date("Nov 29, 2025 20:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft((prev) => ({ ...prev, expired: true }));
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    updateCountdown(); // primera ejecución
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="container">
      <header>
        <img src="/readven.png" alt="Logo Readven" />
      </header>

      <section className="countdown-container">
        <div className="countdown">
          {timeLeft.expired ? (
            <h2>🎉 ¡La Beta ya está disponible!</h2>
          ) : (
            <>
              <div>
                <strong>{timeLeft.days}</strong>
                <span>Días</span>
              </div>
              <div>
                <strong>{timeLeft.hours}</strong>
                <span>Horas</span>
              </div>
              <div>
                <strong>{timeLeft.minutes}</strong>
                <span>Minutos</span>
              </div>
              <div>
                <strong>{timeLeft.seconds}</strong>
                <span>Segundos</span>
              </div>
            </>
          )}
        </div>

        <p className="launch-info">
          Lanzamiento Beta: <strong>29 de noviembre de 2025 - 8:00 PM</strong>
        </p>
      </section>

      <div className="btn-container">
        <a
          href="https://tu-enlace-de-avatares.com"
          className="btn-avatar"
          target="_blank"
          rel="noopener noreferrer"
        >
          🎮 Personaliza tu Avatar en 3D
        </a>
      </div>

      <div className="socials">
        <a href="#" className="social-icon">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="fab fa-tiktok"></i>
        </a>
      </div>

      <footer>© 2025 Readven - Todos los derechos reservados</footer>
    </div>
  );
};

export default Landing;
