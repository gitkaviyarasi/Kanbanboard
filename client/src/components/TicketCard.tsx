import { Link } from 'react-router-dom';

import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        const data = await deleteTicket(ticketId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='ticket-card'>
    <div className="linedisplay">
    <h3>{ticket.id} - {ticket.name}</h3>
    </div>
      <p>{ticket.description}</p>
      <div className="linedisplay">
      <p>{ticket.assignedUser?.username} -
      {new Date(ticket.createdAt).toLocaleDateString()}</p>
      </div>
      <Link to='/edit' state={{id: ticket.id}} type='button' className='editBtn'>Edit</Link>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;
