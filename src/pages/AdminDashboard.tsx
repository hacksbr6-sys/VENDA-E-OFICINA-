import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Car, 
  Wrench, 
  FileText, 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  X,
  Settings,
  Calendar,
  User,
  DollarSign,
  MapPin,
  Truck
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase, isAnyUserLoggedIn, getCurrentUserRole, getCurrentUsername, setAdminLogin } from '../lib/supabase';
import { useNotifications } from '../hooks/useSupabase';
import InvoiceGenerator from '../components/InvoiceGenerator';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price_inshop: number;
  price_offsite: number;
  requires_tow: boolean;
  is_active: boolean;
  created_at: string;
}

interface CarRequest {
  id: string;
  car_id: string;
  customer_id: string;
  customer_name: string;
  contact: string;
  price_offered: number;
  status: string;
  created_at: string;
  cars: Car;
}

interface Invoice {
  id: string;
  invoice_number: number;
  customer_id: string;
  mechanic_name: string;
  location: string;
  tow_required: boolean;
  parts_extra_value: number;
  parts_fee_pct: number;
  discount_pct: number;
  discount_value: number;
  subtotal: number;
  total: number;
  created_at: string;
  order_data: any;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, refetch: refetchNotifications } = useNotifications();
  const userRole = getCurrentUserRole();
  const username = getCurrentUsername();
  
  const [activeTab, setActiveTab] = useState<'cars' | 'services' | 'requests' | 'invoices' | 'notifications'>('cars');
  const [cars, setCars] = useState<Car[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [carRequests, setCarRequests] = useState<CarRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [showCarForm, setShowCarForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [carForm, setCarForm] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    description: '',
    image_url: ''
  });

  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price_inshop: 0,
    price_offsite: 0,
    requires_tow: false
  });

  useEffect(() => {
    if (!isAnyUserLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    
    // If mechanic, redirect to invoices tab
    if (userRole === 'mechanic') {
      setActiveTab('invoices');
    }
    
    fetchData();
  }, [navigate, userRole]);

  useEffect(() => {
    // Filter invoices based on search term
    if (searchTerm.trim() === '') {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter(invoice => 
        invoice.customer_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInvoices(filtered);
    }
  }, [searchTerm, invoices]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCars(),
        fetchServices(),
        fetchCarRequests(),
        fetchInvoices()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    setCars(data || []);
  };

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    setServices(data || []);
  };

  const fetchCarRequests = async () => {
    const { data, error } = await supabase
      .from('car_resale_requests')
      .select(`
        *,
        cars (*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    setCarRequests(data || []);
  };

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    setInvoices(data || []);
  };

  const handleLogout = () => {
    setAdminLogin(false);
    navigate('/');
  };

  const handleCarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCar) {
        const { error } = await supabase
          .from('cars')
          .update(carForm)
          .eq('id', editingCar.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cars')
          .insert([carForm]);
        
        if (error) throw error;
      }
      
      await fetchCars();
      setShowCarForm(false);
      setEditingCar(null);
      setCarForm({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        description: '',
        image_url: ''
      });
    } catch (error) {
      console.error('Error saving car:', error);
      alert('Erro ao salvar carro');
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceForm)
          .eq('id', editingService.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceForm]);
        
        if (error) throw error;
      }
      
      await fetchServices();
      setShowServiceForm(false);
      setEditingService(null);
      setServiceForm({
        name: '',
        description: '',
        price_inshop: 0,
        price_offsite: 0,
        requires_tow: false
      });
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Erro ao salvar serviço');
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
      
      if (error) throw error;
      
      await fetchServices();
      alert('Serviço excluído com sucesso!');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Erro ao excluir serviço. Verifique se não há dependências.');
    }
  };

  const handleDeleteCar = async (carId: string) => {
    if (!confirm('Tem certeza que deseja excluir este carro? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);
      
      if (error) throw error;
      
      await fetchCars();
      alert('Carro excluído com sucesso!');
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Erro ao excluir carro. Verifique se não há dependências.');
    }
  };

  const handleDeleteInvoice = async (invoiceId: string, invoiceNumber: number) => {
    // Verificar se o usuário é ADMEC
    if (username !== 'ADMEC') {
      alert('Apenas o administrador ADMEC pode excluir notas fiscais.');
      return;
    }

    if (!confirm(`Tem certeza que deseja excluir a nota fiscal MGU-${invoiceNumber}? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId);
      
      if (error) throw error;
      
      await fetchInvoices();
      alert('Nota fiscal excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Erro ao excluir nota fiscal. Tente novamente.');
    }
  };

  const handleDeleteCarRequest = async (requestId: string, customerName: string) => {
    // Verificar se o usuário é ADMEC
    if (username !== 'ADMEC') {
      alert('Apenas o administrador ADMEC pode excluir solicitações de compra.');
      return;
    }

    if (!confirm(`Tem certeza que deseja excluir a solicitação de compra de ${customerName}? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('car_resale_requests')
        .delete()
        .eq('id', requestId);
      
      if (error) throw error;
      
      await fetchCarRequests();
      alert('Solicitação de compra excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting car request:', error);
      alert('Erro ao excluir solicitação de compra. Tente novamente.');
    }
  };

  const handleClearAllNotifications = async () => {
    // Verificar se o usuário é ADMEC
    if (username !== 'ADMEC') {
      alert('Apenas o administrador ADMEC pode limpar todas as notificações.');
      return;
    }

    if (!confirm('Tem certeza que deseja limpar todas as notificações? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all notifications
      
      if (error) throw error;
      
      await refetchNotifications();
      alert('Todas as notificações foram limpas com sucesso!');
    } catch (error) {
      console.error('Error clearing notifications:', error);
      alert('Erro ao limpar notificações. Tente novamente.');
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    // Verificar se o usuário é ADMEC
    if (username !== 'ADMEC') {
      alert('Apenas o administrador ADMEC pode excluir notificações.');
      return;
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);
      
      if (error) throw error;
      
      await refetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('Erro ao excluir notificação. Tente novamente.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCarForm(prev => ({ ...prev, image_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRequestStatusUpdate = async (requestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('car_resale_requests')
        .update({ status })
        .eq('id', requestId);
      
      if (error) throw error;
      await fetchCarRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      await refetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const viewInvoiceDetails = async (invoice: Invoice) => {
    try {
      // Prepare invoice data for the InvoiceGenerator component
      const invoiceForDisplay = {
        ...invoice,
        services: invoice.order_data?.services || [],
        totals: {
          servicesSubtotal: invoice.subtotal - (invoice.parts_extra_value || 0) - ((invoice.parts_extra_value || 0) * (invoice.parts_fee_pct || 0) / 100),
          partsSubtotal: invoice.parts_extra_value || 0,
          partsTax: ((invoice.parts_extra_value || 0) * (invoice.parts_fee_pct || 0)) / 100,
          subtotal: invoice.subtotal,
          discountAmount: invoice.discount_value + (invoice.subtotal * (invoice.discount_pct || 0)) / 100,
          total: invoice.total
        }
      };
      
      setSelectedInvoice(invoiceForDisplay);
      setShowInvoiceDetails(true);
    } catch (error) {
      console.error('Error loading invoice details:', error);
      alert('Erro ao carregar detalhes da nota fiscal');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
          <p className="text-white">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-black border-b-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">PAINEL ADMINISTRATIVO</h1>
                <p className="text-red-400 text-xs">
                  Mecânica Guaianases - {userRole === 'admin' ? 'Administrador' : 'Mecânico'} ({username})
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-white"
              >
                <span>← Voltar ao Site</span>
              </Link>
              <div className="flex items-center space-x-2 text-white">
                <Bell className="h-5 w-5" />
                <span className="text-sm">{unreadCount} não lidas</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-white"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-black/50 p-1 rounded-xl">
          {[
            { id: 'cars', label: 'Carros', icon: Car },
            { id: 'services', label: 'Serviços', icon: Wrench },
            { id: 'requests', label: 'Solicitações', icon: FileText },
            { id: 'invoices', label: 'Notas Fiscais', icon: FileText },
            { id: 'notifications', label: 'Notificações', icon: Bell }
          ].filter(tab => {
            // Show all tabs for admin, only invoices for mechanic
            return userRole === 'admin' || tab.id === 'invoices';
          }).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.id === 'notifications' && userRole === 'admin' && unreadCount > 0 && (
                <span className="bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cars Tab */}
        {activeTab === 'cars' && userRole === 'admin' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gerenciar Carros</h2>
              <button
                onClick={() => setShowCarForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar Carro</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 rounded-xl border border-gray-800 overflow-hidden"
                >
                  <img
                    src={car.image_url || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {car.brand} {car.model} ({car.year})
                    </h3>
                    <p className="text-red-400 font-bold text-xl mb-2">
                      ${car.price.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {car.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        car.is_active 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {car.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingCar(car);
                            setCarForm({
                              brand: car.brand,
                              model: car.model,
                              year: car.year,
                              price: car.price,
                              description: car.description || '',
                              image_url: car.image_url || ''
                            });
                            setShowCarForm(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && userRole === 'admin' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gerenciar Serviços</h2>
              <button
                onClick={() => setShowServiceForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar Serviço</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 rounded-xl border border-gray-800 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-bold text-lg">{service.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        service.is_active 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {service.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setServiceForm({
                            name: service.name,
                            description: service.description || '',
                            price_inshop: service.price_inshop,
                            price_offsite: service.price_offsite,
                            requires_tow: service.requires_tow
                          });
                          setShowServiceForm(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Preço Interno:</span>
                      <span className="text-green-400 font-bold">
                        ${service.price_inshop.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Preço Externo:</span>
                      <span className="text-yellow-400 font-bold">
                        ${service.price_offsite.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Car Requests Tab */}
        {activeTab === 'requests' && userRole === 'admin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Solicitações de Compra</h2>
            
            <div className="space-y-4">
              {carRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 rounded-xl border border-gray-800 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">
                        {request.cars.brand} {request.cars.model} ({request.cars.year})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Cliente:</span>
                          <p className="text-white font-medium">{request.customer_name}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">ID:</span>
                          <p className="text-white font-medium">{request.customer_id}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Telefone:</span>
                          <p className="text-white font-medium">{request.contact || 'Não informado'}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Preço:</span>
                          <p className="text-green-400 font-bold">
                            ${request.price_offered?.toLocaleString() || request.cars.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-400">Data da Solicitação:</span>
                        <p className="text-white">
                          {format(new Date(request.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-600'
                          : request.status === 'sold'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {request.status === 'pending' ? 'Pendente' : 
                         request.status === 'sold' ? 'Vendido' : 'Cancelado'}
                      </span>
                      
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleRequestStatusUpdate(request.id, 'sold')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleRequestStatusUpdate(request.id, 'cancelled')}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                      
                      {username === 'ADMEC' && (
                        <button
                          onClick={() => handleDeleteCarRequest(request.id, request.customer_name)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs flex items-center space-x-1 ml-2"
                          title="Apenas ADMEC pode excluir solicitações"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Excluir</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Notas Fiscais</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por ID do cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-red-600 focus:outline-none w-64"
                  />
                </div>
                <span className="text-gray-400 text-sm">
                  {filteredInvoices.length} nota(s) encontrada(s)
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 rounded-xl border border-gray-800 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <span className="text-gray-400 text-sm">Número:</span>
                        <p className="text-white font-bold">MGU-{invoice.invoice_number}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Cliente:</span>
                        <p className="text-white font-medium">{invoice.customer_id}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Mecânico:</span>
                        <p className="text-white font-medium">{invoice.mechanic_name}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Total:</span>
                        <p className="text-green-400 font-bold">${invoice.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Data:</span>
                        <p className="text-white">
                          {format(new Date(invoice.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => viewInvoiceDetails(invoice)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Ver</span>
                    </button>
                    
                    {username === 'ADMEC' && (
                      <button
                        onClick={() => handleDeleteInvoice(invoice.id, invoice.invoice_number)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 ml-2"
                        title="Apenas ADMEC pode excluir notas fiscais"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Excluir</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && userRole === 'admin' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Notificações</h2>
              {username === 'ADMEC' && notifications.length > 0 && (
                <button
                  onClick={handleClearAllNotifications}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  title="Apenas ADMEC pode limpar todas as notificações"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Limpar Todas</span>
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-6 ${
                    notification.is_read
                      ? 'bg-black/30 border-gray-800'
                      : 'bg-black/50 border-yellow-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`${notification.is_read ? 'text-gray-400' : 'text-white'} mb-2`}>
                        {notification.message}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {format(new Date(notification.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.is_read && (
                        <button
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          Marcar como lida
                        </button>
                      )}
                      
                      {username === 'ADMEC' && (
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Apenas ADMEC pode excluir notificações"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">
                    Nenhuma notificação
                  </h3>
                  <p className="text-gray-500">
                    Todas as notificações aparecerão aqui
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Car Form Modal */}
      {showCarForm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-red-600"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingCar ? 'Editar Carro' : 'Adicionar Carro'}
              </h3>
              <button
                onClick={() => {
                  setShowCarForm(false);
                  setEditingCar(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCarSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Marca"
                  value={carForm.brand}
                  onChange={(e) => setCarForm(prev => ({ ...prev, brand: e.target.value }))}
                  className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Modelo"
                  value={carForm.model}
                  onChange={(e) => setCarForm(prev => ({ ...prev, model: e.target.value }))}
                  className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Ano"
                  value={carForm.year}
                  onChange={(e) => setCarForm(prev => ({ ...prev, year: Number(e.target.value) }))}
                  className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Preço"
                  value={carForm.price}
                  onChange={(e) => setCarForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                  required
                />
              </div>
              
              <input
                type="url"
                placeholder="URL da Imagem"
                value={carForm.image_url}
                onChange={(e) => setCarForm(prev => ({ ...prev, image_url: e.target.value }))}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
              />
              
              <div className="text-center text-gray-400 text-sm">ou</div>
              
              <div>
                <label className="block text-white text-sm mb-2">Enviar Foto do Dispositivo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700"
                />
              </div>
              
              {carForm.image_url && (
                <div className="mt-4">
                  <p className="text-white text-sm mb-2">Preview da Imagem:</p>
                  <img
                    src={carForm.image_url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border border-gray-700"
                  />
                </div>
              )}
              
              <textarea
                placeholder="Descrição"
                value={carForm.description}
                onChange={(e) => setCarForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none h-24 resize-none"
              />

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCarForm(false);
                    setEditingCar(null);
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
                >
                  {editingCar ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-red-600"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingService ? 'Editar Serviço' : 'Adicionar Serviço'}
              </h3>
              <button
                onClick={() => {
                  setShowServiceForm(false);
                  setEditingService(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome do Serviço"
                value={serviceForm.name}
                onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                required
              />
              
              <textarea
                placeholder="Descrição"
                value={serviceForm.description}
                onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none h-24 resize-none"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm mb-2">Preço Interno</label>
                  <input
                    type="number"
                    step="0.01"
                    value={serviceForm.price_inshop}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, price_inshop: Number(e.target.value) }))}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">Preço Externo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={serviceForm.price_offsite}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, price_offsite: Number(e.target.value) }))}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                    required
                  />
                </div>
              </div>
              
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={serviceForm.requires_tow}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, requires_tow: e.target.checked }))}
                  className="rounded border-gray-700 bg-black/50 text-red-600 focus:ring-red-600"
                />
                <span>Requer Guincho</span>
              </label>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowServiceForm(false);
                    setEditingService(null);
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
                >
                  {editingService ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {showInvoiceDetails && selectedInvoice && (
        <InvoiceGenerator
          invoice={selectedInvoice}
          onClose={() => {
            setShowInvoiceDetails(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
