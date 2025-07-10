import { useEffect, useState } from "react";
import Event from "./Event";

const EventList = () => {

     const [events, setEvents] = useState([]);


     // recuperation des evenement dans la RTDB de firebase a l'aide des requetes http
    useEffect(() => {
        
        fetch("https://plateforme-evenementielle-default-rtdb.firebaseio.com/evenements.json")
        .then((res) => res.json())
        .then((data) => {
            const eventsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setEvents(eventsArray);
        });
    }, []);

    return (
        <div className="p-4   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {events.length === 0 && <p className="text-center col-span-4">Aucun événement disponible</p>}
            
            {events.map((event) => (
                <Event  event={event} key={event.id} />
            ))}
        </div>
    )}
export default EventList;