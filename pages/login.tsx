import Image from "next/image";
import styles from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Teste sem backend (autenticação simulada)
    if (email === "teste@email.com" && senha === "123456") {
      localStorage.setItem("token", "token_fake");
      router.push("/dashboard");
      return;
    }

    // Aqui você pode adicionar a chamada real para a API depois
    setErro("Email ou senha inválidos");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src="/houseCampolim.jpeg"
          alt="Imagem"
          width={400}
          height={400}
          className={styles.image}
        />
      </div>

      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Login</h2>

          {erro && <p className={styles.error}>{erro}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
