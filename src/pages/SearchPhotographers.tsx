
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Camera, Star, Mail } from "lucide-react";

type Photographer = {
  id: string;
  name: string;
  profileImage: string;
  specialties: string[];
  location: string;
  distance: number;
  rating: number;
};

const MOCK_PHOTOGRAPHERS: Photographer[] = [
  {
    id: "1",
    name: "Ana Silva",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    specialties: ["Casamento", "Ensaio"],
    location: "São Paulo, SP",
    distance: 5,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    specialties: ["Corporativo", "Eventos"],
    location: "São Paulo, SP",
    distance: 8,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Mariana Costa",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    specialties: ["Aniversário", "Formatura"],
    location: "Guarulhos, SP",
    distance: 15,
    rating: 4.9,
  }
];

const SearchPhotographers = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [photographers, setPhotographers] = useState<Photographer[]>(MOCK_PHOTOGRAPHERS);

  // Simula filtragem de fotógrafos - em uma implementação real isso conectaria com o backend
  const handleSearch = () => {
    // Neste exemplo, apenas simula um filtro básico
    let filtered = MOCK_PHOTOGRAPHERS;
    
    if (location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (specialty) {
      filtered = filtered.filter(p => 
        p.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
      );
    }
    
    setPhotographers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Encontre o fotógrafo perfeito para o seu momento</h1>
            <p className="text-gray-600 mb-8">
              Busque por localização, especialidade e descubra talentos incríveis perto de você
            </p>
          </div>
        </div>
      </section>

      {/* Search filters */}
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Localização</label>
              <Input 
                placeholder="Digite sua cidade ou CEP" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Especialidade</label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casamento">Casamento</SelectItem>
                  <SelectItem value="aniversario">Aniversário</SelectItem>
                  <SelectItem value="formatura">Formatura</SelectItem>
                  <SelectItem value="corporativo">Corporativo</SelectItem>
                  <SelectItem value="ensaio">Ensaio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full md:w-auto">Buscar</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Fotógrafos encontrados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.length > 0 ? (
              photographers.map((photographer) => (
                <Card key={photographer.id} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={photographer.profileImage} 
                      alt={photographer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-semibold">{photographer.name}</h3>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Camera className="w-4 h-4 mr-1" />
                      <span>{photographer.specialties.join(", ")}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{photographer.location} • {photographer.distance} km</span>
                    </div>
                    
                    <div className="flex items-center text-sm mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                      <span className="font-medium">{photographer.rating}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2 pt-0">
                    <Button variant="outline" className="flex-1">Ver perfil</Button>
                    <Button className="flex-1">
                      <Mail className="w-4 h-4 mr-1" /> Contato
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Nenhum fotógrafo encontrado. Tente outros filtros.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPhotographers;
