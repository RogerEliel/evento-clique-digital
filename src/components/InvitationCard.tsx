
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvitationCardProps {
  eventId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  totalGuests?: number;
  confirmedGuests?: number;
  previewMode?: boolean;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  eventId,
  title,
  date,
  time,
  location,
  imageUrl,
  totalGuests,
  confirmedGuests,
  previewMode = false,
}) => {
  const defaultImage = "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80";
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
      <div className="h-40 md:h-56 overflow-hidden relative">
        <img 
          src={imageUrl || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="p-5 space-y-4">
        <h3 className="text-xl md:text-2xl font-semibold text-seuclique-darkslate">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-seuclique-silver">
            <Calendar size={16} className="mr-2" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-seuclique-silver">
            <Clock size={16} className="mr-2" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-seuclique-silver">
            <MapPin size={16} className="mr-2" />
            <span className="truncate">{location}</span>
          </div>
          
          {(totalGuests !== undefined && confirmedGuests !== undefined) && (
            <div className="flex items-center text-seuclique-silver">
              <Users size={16} className="mr-2" />
              <span>{confirmedGuests} / {totalGuests} convidados confirmados</span>
            </div>
          )}
        </div>
        
        {previewMode ? (
          <div className="flex items-center justify-between gap-4 pt-2">
            <Link to={`/dashboard/events/${eventId}/edit`}>
              <Button variant="outline" className="w-full">
                Editar
              </Button>
            </Link>
            <Link to={`/dashboard/events/${eventId}/guests`}>
              <Button className="w-full bg-seuclique-turquoise hover:bg-seuclique-turquoise/90 text-white">
                Ver Convidados
              </Button>
            </Link>
          </div>
        ) : (
          <Link to={`/invite/${eventId}`}>
            <Button className="w-full bg-seuclique-turquoise hover:bg-seuclique-turquoise/90 text-white">
              Confirmar Presença
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default InvitationCard;
