import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Greek Life Student Management System</title>
        <meta name="description" content="Christina Kidd Capstone Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/students" passHref><a>Greek Life SMS!</a></Link>
        </h1>

        <p>
          <b>Greek Life Student Management System</b>
        </p>
      </main>

      <footer className={styles.footer}>
        <p>
          by Christina Kidd
        </p>
      </footer>
    </div>
  )
}
