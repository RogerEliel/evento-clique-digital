
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface EventDetails {
  event_id: string;
  event_name: string;
  event_date: string;
  event_location: string | null;
  event_description: string | null;
  guest_name: string;
}

interface Photo {
  photo_id: string;
  photo_url: string;
  photo_created_at: string;
}

export default function GalleryPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    async function loadGallery() {
      if (!token) {
        setError('Token inválido');
        setLoading(false);
        return;
      }

      try {
        // Set the guest token for this session
        await supabase.rpc('set_guest_token', { token });

        // Fetch event details
        const { data: eventData, error: eventError } = await supabase
          .rpc('get_event_by_guest_token', { token });

        if (eventError) throw eventError;
        if (!eventData || eventData.length === 0) throw new Error('Evento não encontrado');

        setEventDetails(eventData[0]);

        // Fetch photos
        const { data: photosData, error: photosError } = await supabase
          .rpc('get_photos_by_guest_token', { token });

        if (photosError) throw photosError;
        setPhotos(photosData || []);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar a galeria');
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !eventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro ao acessar galeria</h1>
          <p className="text-gray-600">{error || 'Link inválido ou expirado'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{eventDetails.event_name}</h1>
            <div className="text-gray-600 space-y-2">
              <p className="text-lg">Olá, {eventDetails.guest_name}!</p>
              <p>Data: {format(new Date(eventDetails.event_date), 'dd/MM/yyyy')}</p>
              {eventDetails.event_location && (
                <p>Local: {eventDetails.event_location}</p>
              )}
              {eventDetails.event_description && (
                <p className="mt-4">{eventDetails.event_description}</p>
              )}
            </div>
          </div>

          {photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div 
                  key={photo.photo_id} 
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.photo_url}
                    alt={`Foto do evento ${eventDetails.event_name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Nenhuma foto disponível ainda.</p>
            </div>
          )}
        </div>
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full max-w-6xl" onClick={e => e.stopPropagation()}>
            <Carousel>
              <CarouselContent>
                {photos.map((photo) => (
                  <CarouselItem key={photo.photo_id}>
                    <div className="flex items-center justify-center h-[80vh]">
                      <img
                        src={photo.photo_url}
                        alt={`Foto do evento ${eventDetails.event_name}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
              onClick={() => setSelectedPhoto(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
