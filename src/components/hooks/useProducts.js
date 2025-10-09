// hooks/useProducts.js
import { useState, useEffect } from 'react';
import ApiService from '../../connection/apiService'; 

export function useProducts(initialLimit = 10) {
  const [produtosList, setProdutosList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   async function fetchProdutos(page = 0, limit = initialLimit) { 
    setLoading(true);
    setError(null);
    
    try {
      console.log('Buscando produtos...', { page, limit });
      
      const produtos = await ApiService.product.getProducts(page);
  
      console.log('Produtos recebidos:', produtos);
      
      setProdutosList(produtos.content || []);

      produtos.content.map(async (product) => {
        try {
          console.log('Buscando imagem para o produto ID:', product.id);
          const imageFile = await ApiService.product.getImageFile(product.id);
          console.log('Imagem recebida para o produto ID:', product.id, imageFile);

          setImage(imageFile);
          console.log('Imagem do produto:', imageFile);
        } catch (error) {
          console.error('Erro ao buscar imagem do produto:', error);
        }
      });
      
    } catch (err) {
      console.error('❌ Erro ao buscar produtos:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProdutos(0); 
  }, []);

  // tentando recarregar os1 produtos
  const reloadProdutos = (page = 0, limit = initialLimit) => {
    fetchProdutos(page, limit);
  };

  return {
    produtosList,
    image,
    loading,
    error,
    reloadProdutos,
    fetchProdutos
  };
}