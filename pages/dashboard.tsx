import styles from "../styles/dashboard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUserEmail("usuario@teste.com");
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>Bem-vindo</h1>
        <p className={styles.description}>Você está logado como: <strong>{userEmail}</strong></p>
      </main>
    </div>
  );
}
