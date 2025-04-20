
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Bem-vindo ao Seu Clique</h1>
        <p className="text-xl text-gray-600 mb-8">
          A plataforma ideal para fotógrafos profissionais.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/cadastro">Cadastrar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
