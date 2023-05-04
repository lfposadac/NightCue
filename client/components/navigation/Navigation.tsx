import Link from 'next/link'
import styles from './Navigation.module.css'
import { link } from '@/interfaces/link'

const links: link[] = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Login',
    route: '/login'
  },
  {
    label: 'Register',
    route: '/register'
  },
  {
    label: 'About',
    route: '/about'
  },
  {
    label: 'Post',
    route: '/posts'
  },
  {
    label: 'Reserva',
    route: '/reserva'
  }
]

export function Navigation () {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li className={styles.li} key={route}>
              <Link href={route}> {label} </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
