const Event = ({ event }) => {
  return (
    
    <div className=" bg-slate-200 animate-pulse rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-700">{event.description}</p>
      <div className="mt-4 flex justify-between  items-center">
        <p className="text-gray-500 mt-2">Date: {event.date}</p>
        <a href="#" className="text-blue-500 hover:underline">
          
          Lire la suite
        </a>
      </div>
    </div>
  );
};

export default Event;
