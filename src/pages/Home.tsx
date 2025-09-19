import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Wrench, Shield, Clock, Camera, MapPin, Users, Gamepad2, Star, Award, Zap, Phone } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Revenda de Carros',
      description: 'Os melhores veículos da cidade com preços imperdíveis.',
      color: 'from-red-500 to-red-700'
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Serviços Completos',
      description: 'Manutenção, reparos e customização com qualidade garantida.',
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Confiança Total',
      description: 'Anos de experiência e clientes satisfeitos em Guaianases.',
      color: 'from-red-600 to-red-800'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Atendimento 24h',
      description: 'Estamos sempre prontos para te atender quando precisar.',
      color: 'from-gray-700 to-black'
    },
  ];

  const galleryImages = [
    {
      src: '/FRENTE 2.png',
      alt: 'Fachada Principal da Mecânica Guaianases',
      title: 'Nossa Fachada',
      category: 'Estrutura',
      icon: <MapPin className="h-4 w-4" />
    },
    {
      src: '/FENTE 1.png',
      alt: 'Vista Frontal da Oficina',
      title: 'Entrada Principal',
      category: 'Estrutura',
      icon: <MapPin className="h-4 w-4" />
    },
    {
      src: '/CIMA.png',
      alt: 'Vista Aérea da Mecânica',
      title: 'Vista de Cima',
      category: 'Estrutura',
      icon: <Camera className="h-4 w-4" />
    },
    {
      src: '/CIMA 2.png',
      alt: 'Área de Lazer dos Funcionários',
      title: 'Área de Lazer',
      category: 'Ambiente',
      icon: <Users className="h-4 w-4" />
    },
    {
      src: '/sala de jogos.png',
      alt: 'Sala de Jogos para Descanso',
      title: 'Sala de Jogos',
      category: 'Ambiente',
      icon: <Gamepad2 className="h-4 w-4" />
    },
    {
      src: '/mect 3.png',
      alt: 'Mecânico Trabalhando na Oficina',
      title: 'Profissional em Ação',
      category: 'Trabalho',
      icon: <Wrench className="h-4 w-4" />
    },
    {
      src: '/mect 2.png',
      alt: 'Serviços Especializados',
      title: 'Expertise Técnica',
      category: 'Trabalho',
      icon: <Wrench className="h-4 w-4" />
    },
    {
      src: '/mect 1.png',
      alt: 'Mecânico Experiente Trabalhando',
      title: 'Qualidade Garantida',
      category: 'Trabalho',
      icon: <Wrench className="h-4 w-4" />
    }
  ];

  const achievements = [
    { icon: <Star className="h-8 w-8" />, number: "15+", label: "Anos de Experiência", color: "text-yellow-400" },
    { icon: <Users className="h-8 w-8" />, number: "500+", label: "Clientes Satisfeitos", color: "text-blue-400" },
    { icon: <Clock className="h-8 w-8" />, number: "24h", label: "Atendimento", color: "text-green-400" },
    { icon: <Award className="h-8 w-8" />, number: "100%", label: "Qualidade Garantida", color: "text-red-400" }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Enhanced Design */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-black"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(220,38,38,0.3) 50%, rgba(0,0,0,0.9) 100%), url('/Imagem do WhatsApp de 2025-09-10 à(s) 13.58.40_8d92645a.jpg')`
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Logo/Brand Section */}
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full mb-6 shadow-2xl"
              >
                <Wrench className="h-12 w-12 text-white" />
              </motion.div>
            </div>

            {/* Main Title with Enhanced Typography */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
                MECÂNICA
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">
                GUAIANASES
              </span>
            </motion.h1>

            {/* Subtitle with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-xl md:text-3xl mb-4 text-gray-200 font-light">
                A oficina mais respeitada de <span className="text-red-400 font-bold">GuaianaseRP</span>
              </p>
              <div className="flex items-center justify-center space-x-2 text-red-400">
                <Zap className="h-5 w-5" />
                <span className="text-lg font-medium">Qualidade • Confiança • Tradição</span>
                <Zap className="h-5 w-5" />
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/cars"
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Car className="h-6 w-6" />
                  <span>Ver Carros Disponíveis</span>
                </div>
              </Link>
              
              <Link
                to="/workshop"
                className="group relative border-2 border-white hover:border-red-400 bg-black/30 hover:bg-red-600/20 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <Wrench className="h-6 w-6" />
                  <span>Calcular Serviços</span>
                </div>
              </Link>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex items-center justify-center space-x-2 text-gray-300"
            >
              <Phone className="h-4 w-4 text-red-400" />
              <span className="text-sm">Atendimento 24h • Orçamento Gratuito</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`${achievement.color} mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.icon}
                </div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                  {achievement.number}
                </div>
                <div className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-20 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Conheça Nossa <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Estrutura</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Uma oficina completa com profissionais qualificados e ambiente de trabalho de primeira qualidade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 hover:border-red-600 transition-all duration-500 transform hover:scale-105"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                      image.category === 'Estrutura' ? 'bg-blue-600/80 text-white' :
                      image.category === 'Ambiente' ? 'bg-green-600/80 text-white' :
                      'bg-red-600/80 text-white'
                    }`}>
                      {image.icon}
                      <span>{image.category}</span>
                    </span>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-black text-xl mb-2">{image.title}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-red-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Por que escolher a Mecânica Guaianases?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Somos a oficina de confiança dos melhores players de GuaianaseRP
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-red-600 transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-red-600 group-hover:text-red-400 transition-colors mb-6 transform group-hover:scale-110 duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Professional Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Equipe <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Profissional</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Nossos mecânicos são especialistas com anos de experiência e dedicação total ao seu veículo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: '/mect 1.png',
                title: 'Especialista em Motor',
                description: 'Mais de 10 anos de experiência em reparos de motor e sistemas complexos'
              },
              {
                image: '/mect 2.png',
                title: 'Técnico em Eletrônica',
                description: 'Especializado em diagnósticos eletrônicos e sistemas modernos'
              },
              {
                image: '/mect 3.png',
                title: 'Mecânico Geral',
                description: 'Profissional versátil com expertise em todos os tipos de serviços'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-500 transform hover:scale-105"
              >
                <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {member.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Pronto para turbinar seu rolê?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Entre em contato conosco e descubra por que somos a oficina #1 de Guaianases
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/workshop"
                className="group bg-black hover:bg-gray-900 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Wrench className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Fazer Orçamento</span>
                </div>
              </Link>
              <Link
                to="/cars"
                className="group border-2 border-white hover:bg-white hover:text-red-600 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Car className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Comprar Carro</span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
