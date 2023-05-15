import styles from './Login.module.css';

const SignIn = () => {
  // ...

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={styles.input} />
      </label>
      <br />
      <label className={styles.label}>
        Password:
        <input type