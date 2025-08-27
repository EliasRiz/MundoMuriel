import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Star, Package, Sparkles, Droplets } from 'lucide-react';
import './App.css';
import catalogData from './assets/catalog_data.json';

const App = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const categoryIcons = {
    'Cabelo': Package,
    'Aromatizante': Sparkles,
    'Perfume': Droplets,
    'Body Splash': Star
  };

  const categoryColors = {
    'Cabelo': 'from-purple-500 to-pink-500',
    'Aromatizante': 'from-blue-500 to-cyan-500',
    'Perfume': 'from-amber-500 to-orange-500',
    'Body Splash': 'from-green-500 to-emerald-500'
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentView('subcategories');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentView('products');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleBackToSubcategories = () => {
    setCurrentView('subcategories');
    setSelectedSubcategory(null);
  };

  const renderMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-slate-700 mr-4" />
            <h1 className="text-5xl font-bold text-slate-800">Catálogo Interativo</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore nossa linha completa de produtos de beleza e cuidados pessoais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.keys(catalogData).map((category) => {
            const Icon = categoryIcons[category];
            const colorClass = categoryColors[category];
            
            return (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${colorClass} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}>
                  <div className="text-center text-white">
                    <Icon className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h2 className="text-2xl font-bold mb-2">{category}</h2>
                    <p className="text-sm opacity-90">
                      {Object.keys(catalogData[category]).length} subcategorias
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSubcategories = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={handleBackToMenu}
            className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 mr-6"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Voltar ao Menu
          </button>
          <h1 className="text-4xl font-bold text-slate-800">{selectedCategory}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(catalogData[selectedCategory]).map((subcategory) => {
            const productCount = catalogData[selectedCategory][subcategory].length;
            
            return (
              <div
                key={subcategory}
                onClick={() => handleSubcategoryClick(subcategory)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 border border-slate-200"
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{subcategory}</h3>
                <p className="text-slate-600">{productCount} produto{productCount !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={handleBackToSubcategories}
            className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 mr-6"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Voltar
          </button>
          <div>
            <h1 className="text-4xl font-bold text-slate-800">{selectedSubcategory}</h1>
            <p className="text-slate-600">{selectedCategory}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogData[selectedCategory][selectedSubcategory].map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200"
            >
              <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <img
                  src={product.foto_link}
                  alt={product.nome}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center">
                  <Package className="w-16 h-16 text-slate-400" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{product.nome}</h3>
                <p className="text-2xl font-bold text-green-600 mb-3">{product.preco_medio}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{product.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentView === 'menu' && renderMenu()}
      {currentView === 'subcategories' && renderSubcategories()}
      {currentView === 'products' && renderProducts()}
    </div>
  );
};

export default App;
