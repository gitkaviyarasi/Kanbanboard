import { useState, useEffect } from "react";
import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  const [sortedTickets, setSortedTickets] = useState<TicketData[]>([]);
  const [sortType, setSortType] = useState<string>("date");

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'swim-lane todo';
      case 'In Progress':
        return 'swim-lane inprogress';
      case 'Done':
        return 'swim-lane done';
      default:
        return 'swim-lane';
    }
  };

  // Sorting functions
  const sortByDate = (tickets: TicketData[]) => {
    return [...tickets].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

 const sortByNumber = (tickets: TicketData[]) => {
    return [...tickets].sort((a, b) => b.id - a.id);
  };
  useEffect(() => {
    if (sortType === "date") {
      setSortedTickets(sortByDate(tickets));
    } else if (sortType === "number") {
      setSortedTickets(sortByNumber(tickets));
    }
  }, [tickets, sortType]); // Reacts to changes in tickets or sort type

  return (
    <div className={`swimlane ${getStatusClass(title)}`}>
      <h2>{title}</h2>

      {/* Dropdown to select sort type */}
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="SortDropdown"
      >
        <option value="date">Sort By Date</option>
        <option value="number">Sort By Number -Desc</option>
      </select>

      {/* Render sorted tickets */}
      <div>
        {sortedTickets.map(ticket => (
          <TicketCard 
            key={ticket.id}
            ticket={ticket}
            deleteTicket={deleteTicket}
          />
        ))}
      </div>
    </div>
  );
};

export default Swimlane;
