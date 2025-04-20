
import { useState, useCallback } from 'react';
import { Search, Upload, Filter, Plus, Loader } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

// Mock photos data
const mockPhotos = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Casamento João e Maria',
    tags: ['casal', 'cerimônia'],
    people: ['João', 'Maria'],
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Casamento João e Maria',
    tags: ['festa', 'dança'],
    people: ['João', 'Maria', 'Pedro'],
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Aniversário 15 Anos - Ana',
    tags: ['bolo', 'decoração'],
    people: ['Ana'],
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Aniversário 15 Anos - Ana',
    tags: ['dança', 'festa'],
    people: ['Ana', 'Carlos'],
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Corporate Meeting - Startup X',
    tags: ['apresentação', 'negócios'],
    people: ['Rodrigo', 'Daniela'],
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    event: 'Festival de Música Indie',
    tags: ['palco', 'banda'],
    people: ['Banda Y'],
  },
];

// Mock events for filter
const mockEventOptions = [
  "Todos os eventos",
  "Casamento João e Maria",
  "Aniversário 15 Anos - Ana",
  "Formatura Eng. Civil UFPR",
  "Corporate Meeting - Startup X",
  "Festival de Música Indie",
];

// Mock people for filter
const mockPeopleOptions = [
  "Todas as pessoas",
  "João",
  "Maria",
  "Ana",
  "Pedro",
  "Carlos",
  "Rodrigo",
  "Daniela",
  "Banda Y",
];

export default function GalleryPage() {
  const { toast } = useToast();
  const [photos, setPhotos] = useState(mockPhotos);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState("Todos os eventos");
  const [selectedPerson, setSelectedPerson] = useState("Todas as pessoas");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = 
      photo.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      photo.people.some(person => person.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesEvent = selectedEvent === "Todos os eventos" || photo.event === selectedEvent;
    const matchesPerson = selectedPerson === "Todas as pessoas" || photo.people.includes(selectedPerson);
    
    return matchesSearch && matchesEvent && matchesPerson;
  });

  const handleUpload = useCallback(() => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Mock adding a new photo
          const newPhoto = {
            id: `${photos.length + 1}`,
            url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            event: selectedEvent === "Todos os eventos" ? "Casamento João e Maria" : selectedEvent,
            tags: ['novo', 'upload'],
            people: [selectedPerson === "Todas as pessoas" ? "Novo Convidado" : selectedPerson],
          };
          
          setPhotos([...photos, newPhoto]);
          
          toast({
            title: "Upload concluído",
            description: "Sua foto foi adicionada com sucesso.",
          });
        }
        
        return newProgress;
      });
    }, 500);
    
  }, [photos, selectedEvent, selectedPerson, toast]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Galeria</h1>
          <p className="text-muted-foreground">Visualize e gerencie todas as fotos dos seus eventos</p>
        </div>
        <Button className="bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" /> Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Fazer upload
            </>
          )}
        </Button>
      </div>
      
      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} />
          <p className="text-xs text-center text-muted-foreground">
            Enviando: {uploadProgress}%
          </p>
        </div>
      )}
      
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" /> Pessoa
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Filtrar por pessoa</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockPeopleOptions.map((person) => (
                <DropdownMenuItem
                  key={person}
                  className={`cursor-pointer ${selectedPerson === person ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedPerson(person)}
                >
                  {person}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="group relative rounded-lg overflow-hidden border bg-white">
              <img 
                src={photo.url} 
                alt={`Foto de ${photo.event}`}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"  
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <h3 className="text-white font-medium truncate">{photo.event}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {photo.people.map((person) => (
                    <span key={person} className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#52E0A1]/70 text-[#1E2D3D]">
                      {person}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Upload className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Nenhuma foto encontrada</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Faça upload das suas fotos ou ajuste os filtros de busca.
          </p>
          <Button className="mt-4 bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Fazer upload
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
