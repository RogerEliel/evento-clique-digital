
import { useState, useCallback } from 'react';
import { Download, Filter, Search, Heart, Download as DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

// Mock photos data
const mockPhotos = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Casamento João e Maria',
    date: '2023-10-15',
    liked: false
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Casamento João e Maria',
    date: '2023-10-15',
    liked: true
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Casamento João e Maria',
    date: '2023-10-15',
    liked: false
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Aniversário 15 Anos - Ana',
    date: '2023-11-20',
    liked: true
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Aniversário 15 Anos - Ana',
    date: '2023-11-20',
    liked: false
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Formatura Eng. Civil UFPR',
    date: '2023-09-08',
    liked: false
  }
];

// Mock events for filter
const mockEventOptions = [
  "Todos os eventos",
  "Casamento João e Maria",
  "Aniversário 15 Anos - Ana",
  "Formatura Eng. Civil UFPR"
];

export default function MyGalleryPage() {
  const { toast } = useToast();
  const [photos, setPhotos] = useState(mockPhotos);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState("Todos os eventos");
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = 
      photo.event.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesEvent = selectedEvent === "Todos os eventos" || photo.event === selectedEvent;
    const matchesLiked = onlyLiked ? photo.liked : true;
    
    return matchesSearch && matchesEvent && matchesLiked;
  });

  const handleLikeToggle = useCallback((id: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, liked: !photo.liked } : photo
    ));
  }, [photos]);

  const handlePhotoClick = useCallback((photo: any) => {
    setSelectedPhoto(photo);
    setPreviewOpen(true);
  }, []);

  const handleDownload = useCallback(() => {
    toast({
      title: "Download iniciado",
      description: "Sua foto está sendo preparada para download.",
    });
    
    // In a real app, this would trigger an actual download
  }, [toast]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Minha Galeria</h1>
          <p className="text-muted-foreground">Visualize e baixe suas fotos</p>
        </div>
        <Button 
          className="bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" /> Baixar selecionadas
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar fotos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" /> Evento
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Filtrar por evento</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockEventOptions.map((event) => (
                <DropdownMenuItem
                  key={event}
                  className={`cursor-pointer ${selectedEvent === event ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {event}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant={onlyLiked ? "default" : "outline"} 
            className={onlyLiked ? "bg-[#FF6B6B] hover:bg-[#FF6B6B]/90" : ""}
            onClick={() => setOnlyLiked(!onlyLiked)}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="group relative rounded-lg overflow-hidden border bg-white">
              <img 
                src={photo.url} 
                alt={`Foto de ${photo.event}`}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105 cursor-pointer"
                onClick={() => handlePhotoClick(photo)}  
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <h3 className="text-white font-medium truncate">{photo.event}</h3>
                <p className="text-white/80 text-sm">{new Date(photo.date).toLocaleDateString('pt-BR')}</p>
                <div className="flex justify-end mt-2 gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`text-white hover:bg-white/20 h-8 w-8 p-0 ${photo.liked ? 'text-[#FF6B6B]' : ''}`}
                    onClick={() => handleLikeToggle(photo.id)}
                  >
                    <Heart className="h-4 w-4" fill={photo.liked ? '#FF6B6B' : 'none'} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Nenhuma foto encontrada</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente ajustar seus filtros de busca ou entre em contato com o fotógrafo.
          </p>
        </div>
      )}
      
      {/* Photo Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="absolute top-0 right-0 z-10">
            {/* Close button is built into DialogContent */}
          </DialogHeader>
          {selectedPhoto && (
            <div className="flex flex-col">
              <div className="relative">
                <img 
                  src={selectedPhoto.url} 
                  alt={`Foto de ${selectedPhoto.event}`}
                  className="w-full max-h-[80vh] object-contain"
                />
              </div>
              <DialogFooter className="flex justify-between items-center p-4 border-t">
                <div>
                  <h3 className="font-medium">{selectedPhoto.event}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedPhoto.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className={selectedPhoto.liked ? 'border-[#FF6B6B] text-[#FF6B6B]' : ''}
                    onClick={() => handleLikeToggle(selectedPhoto.id)}
                  >
                    <Heart 
                      className="h-4 w-4 mr-2" 
                      fill={selectedPhoto.liked ? '#FF6B6B' : 'none'} 
                    />
                    {selectedPhoto.liked ? 'Favoritada' : 'Favoritar'}
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]"
                    onClick={handleDownload}
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" /> Baixar
                  </Button>
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
