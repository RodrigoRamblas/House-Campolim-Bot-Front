"use client";

import styles from "./Sidebar.module.css";
import { useRouter } from "next/router";
import { FiHome, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const goToHome = () => {
    router.push("/dashboard");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        <button className={styles.item} onClick={goToHome}>
          <FiHome size={20} />
          <span>Home</span>
        </button>
      </div>

      <div className={styles.footer}>
        <button className={styles.logout} onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
