
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data
  const stats = [
    { label: "Total de Eventos", value: 12 },
    { label: "Eventos Ativos", value: 3 },
    { label: "Total de Convidados", value: 432 },
    { label: "Fotos Processadas", value: "2,154" }
  ];

  const recentEvents = [
    {
      id: "1",
      title: "Casamento Julia e Marcos",
      date: "15/05/2023",
      status: "Completo",
      photos: 345,
      guests: 120
    },
    {
      id: "2",
      title: "Formatura Engenharia USP",
      date: "22/05/2023",
      status: "Processando",
      photos: 721,
      guests: 98
    },
    {
      id: "3",
      title: "Aniversário 30 anos - Ana",
      date: "30/05/2023",
      status: "Aguardando Upload",
      photos: 0,
      guests: 45
    }
  ];

  return (
    <div className="flex h-screen bg-seuclique-lightcloud overflow-hidden">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-[80px]' : 'ml-[250px]'}`}>
        <div className="p-6 md:p-10">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-seuclique-darkslate">Dashboard</h1>
            <p className="text-seuclique-silver">Bem-vindo(a) de volta! Aqui está um resumo da sua atividade.</p>
          </header>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-seuclique-silver text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-seuclique-darkslate">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-seuclique-darkslate">Eventos Recentes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-seuclique-silver bg-gray-50">
                    <th className="px-6 py-3 font-medium">Evento</th>
                    <th className="px-6 py-3 font-medium">Data</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Fotos</th>
                    <th className="px-6 py-3 font-medium">Convidados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-seuclique-darkslate">{event.title}</td>
                      <td className="px-6 py-4 text-seuclique-silver">{event.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'Completo' 
                            ? 'bg-green-100 text-green-800' 
                            : event.status === 'Processando'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-seuclique-silver">{event.photos}</td>
                      <td className="px-6 py-4 text-seuclique-silver">{event.guests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-seuclique-darkslate">Ações Rápidas</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-md hover:border-seuclique-turquoise hover:bg-seuclique-turquoise/5 transition-colors">
                <span className="text-seuclique-darkslate">Novo Evento</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-md hover:border-seuclique-turquoise hover:bg-seuclique-turquoise/5 transition-colors">
                <span className="text-seuclique-darkslate">Upload de Fotos</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-md hover:border-seuclique-turquoise hover:bg-seuclique-turquoise/5 transition-colors">
                <span className="text-seuclique-darkslate">Gerenciar Convidados</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
