import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db as database } from "./firebase";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";

interface Evenement {
  id: string;
  titre: string;
  description: string;
  date: string;
}

function App() {
  const { user, loading } = useAuth();
  const [evenements, setEvenements] = useState<Evenement[]>([]);

useEffect(() => {
  console.log("Utilisateur :", user);

  if (!user) return;

  const evenementsRef = ref(database, "evenements");
  console.log("Référence Firebase utilisée :", evenementsRef.toString());

  const unsubscribe = onValue(evenementsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Données reçues depuis Firebase :", data);

    if (data) {
      const loadedEvents: Evenement[] = Object.entries(data).map(([key, value]) => {
        if (
          typeof value !== "object" ||
          value === null ||
          !("titre" in value) ||
          !("description" in value) ||
          !("date" in value)
        ) {
          console.warn("Valeur non conforme :", value);
          return {
            id: key,
            titre: "Erreur",
            description: "Données invalides",
            date: "N/A"
          };
        }

        const evenementData = value as Omit<Evenement, "id">;

        return {
          id: key,
          ...evenementData
        };
      });

      console.log("Événements transformés :", loadedEvents);
      setEvenements(loadedEvents);
    } else {
      console.warn("Aucun événement trouvé");
      setEvenements([]);
    }
  });

  return () => unsubscribe();
}, [user]);



  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      {user ? (
        <div>
          <p>Bienvenue, {user.displayName}</p>
          <img src={user.photoURL || ""} alt="avatar" width={50} />

          <h2>📅 Événements à venir :</h2>
          <ul>
            {evenements.map((event) => (
              <li key={event.id}>
                <strong>{event.titre}</strong><br />
                <em>{event.date}</em><br />
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

