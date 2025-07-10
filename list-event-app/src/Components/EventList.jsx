import { useEffect, useState } from "react";
import Event from "./Event";
import {  ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";


const EventList = () => {

     const [events, setEvents] = useState([]);
      const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

     // recuperation des evenement dans la RTDB de firebase a l'aide du SDK Firebase
     
        useEffect(() => {
            
            const eventsRef = ref(db, 'evenements');
            onValue(eventsRef, (snapshot) => {

                try {
                const data = snapshot.val();
                const eventsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setEvents(eventsArray);
                setLoading(false);
                }
                catch (error) {
                    setError("Erreur lors de la récupération des événements");

                }
            });
        }, []);

        if (loading) {
    return <div className=" p-4 text-center"> <strong className=" border-5 border-blue-500 rounded-full animate-spin"></strong>Chargement des événements...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Erreur: {error}</div>;
  }
     // recuperation des evenement dans la RTDB de firebase a l'aide des requetes http
    // useEffect(() => {
        
    //     fetch("https://plateforme-evenementielle-default-rtdb.firebaseio.com/evenements.json")
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const eventsArray = Object.keys(data).map((key) => ({
    //             id: key,
    //             ...data[key],
    //         }));
    //         setEvents(eventsArray);
    //     });
    // }, []);

    return (
        <div className="p-4   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {events.length === 0 && <p className="text-center col-span-4">Aucun événement disponible</p>}
            
            {events.map((event) => (
                <Event  event={event} key={event.id} />
            ))}
        </div>
    )}
export default EventList;