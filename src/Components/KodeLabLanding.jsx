import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function KodeLabLanding() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <motion.h1 
        style={styles.heading}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to KodeLab
      </motion.h1>
      <motion.p 
        style={styles.paragraph}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Build. Innovate. Code.
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button style={styles.button} onClick={() => navigate('/dashboard')}>
          Get Started
        </button>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a202c',
    color: 'white',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};
