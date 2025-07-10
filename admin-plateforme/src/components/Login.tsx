import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function Login() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Connecté :", result.user);
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return <button onClick={handleLogin}>Connexion avec Google</button>;
}
