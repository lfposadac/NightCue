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
    label: 'Reserva',
    route: '/reserva'
  },
  {
    label: 'Post',
    route: '/posts'
  },
  {
    label: 'About',
    route: '/about'
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
