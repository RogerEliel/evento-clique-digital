
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Gallery = () => {
  const [filter, setFilter] = useState<string>("todos");

  const categories = [
    "todos",
    "casamento",
    "formatura",
    "aniversário",
    "corporativo",
    "show"
  ];

  const photos = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
      photographer: "Ana Silva",
      location: "São Paulo, SP",
      date: "15/03/2023",
      likes: 236,
      categories: ["casamento"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop",
      photographer: "Ricardo Oliveira",
      location: "Rio de Janeiro, RJ",
      date: "22/05/2023",
      likes: 184,
      categories: ["formatura"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      photographer: "Mariana Costa",
      location: "Belo Horizonte, MG",
      date: "10/04/2023",
      likes: 312,
      categories: ["aniversário"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1472653431158-6364773b2fbc?q=80&w=1000&auto=format&fit=crop",
      photographer: "Carlos Mendes",
      location: "Brasília, DF",
      date: "08/06/2023",
      likes: 159,
      categories: ["corporativo"]
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop",
      photographer: "Fernanda Lima",
      location: "Salvador, BA",
      date: "30/07/2023",
      likes: 278,
      categories: ["show"]
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
      photographer: "Lucas Santos",
      location: "Curitiba, PR",
      date: "19/02/2023",
      likes: 201,
      categories: ["casamento"]
    }
  ];

  const filteredPhotos = filter === "todos" 
    ? photos 
    : photos.filter(photo => photo.categories.includes(filter));

  return (
    <section id="galeria" className="py-20 bg-[#F7F9FB]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#1E2D3D]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Descubra cliques incríveis dos nossos fotógrafos parceiros
          </motion.h2>
          <motion.p 
            className="mt-4 text-[#A0AEC0] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Uma seleção de trabalhos exclusivos autorizados por nossos fotógrafos
          </motion.p>
        </div>

        <motion.div 
          className="flex gap-2 md:gap-4 flex-wrap justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {categories.map((category, index) => (
            <Badge 
              key={index}
              variant={filter === category ? "default" : "outline"}
              className={`
                px-4 py-2 text-sm capitalize cursor-pointer hover:bg-[#1E2D3D] hover:text-white transition-colors
                ${filter === category ? 'bg-[#1E2D3D] text-white' : 'bg-transparent text-[#1E2D3D] border-[#1E2D3D]'}
              `}
              onClick={() => setFilter(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div 
              key={photo.id} 
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[4/3]">
                <img 
                  src={photo.image} 
                  alt={`Foto por ${photo.photographer}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow cursor-pointer hover:bg-[#FF6B6B] group/heart transition-colors">
                  <Heart className="w-4 h-4 text-[#FF6B6B] group-hover/heart:text-white" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <Link to="#" className="font-medium text-[#1E2D3D] hover:text-[#FF6B6B] transition-colors">
                    {photo.photographer}
                  </Link>
                  <div className="flex items-center gap-1 text-[#A0AEC0] text-sm">
                    <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                    <span>{photo.likes}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-sm text-[#A0AEC0]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{photo.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white py-6 px-8 text-lg">
            <Link to="/cadastro" className="inline-flex items-center gap-2">
              <span>Quero ser destaque aqui</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
