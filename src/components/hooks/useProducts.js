import { useState, useEffect } from 'react';
import ApiService from '../../connection/apiService'; 

export function useProducts(initialLimit = 10) {
  const [produtosList, setProdutosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProdutos(page = 0, limit = initialLimit) { 
    setLoading(true);
    setError(null);
    
    try {
      console.log('Buscando produtos...', { page, limit });
      
      const produtos = await ApiService.product.getProducts(page);
      
      setProdutosList(produtos.content || []);

      // Buscar imagens para CADA produtoo
      if (produtos.content && produtos.content.length > 0) {
        const produtosComImagensPromises = produtos.content.map(async (product) => {
          try {
            console.log('Buscando imagem para o produto ID:', product.id);
            
            const responseImages = await ApiService.product.getImage(product.id);
            console.log('Resposta da API (getImage):', responseImages);
            
            const imagensDoProduto = responseImages.data;
            
            if (imagensDoProduto && imagensDoProduto.length > 0) {
              const primeiraImagem = imagensDoProduto[0];
              console.log('Primeira imagem:', primeiraImagem);
              
              //  imageData DIRETAMENTE 
              if (primeiraImagem.imageData) {
                console.log('Usando imageData diretamente da API');
                return {
                  ...product,
                  imageUrl: primeiraImagem.imageData //  URL da imagem!
                };
              } else {
                // Fallback: se não tiver imageData, tenta buscar por getImageFile...
                console.log('⚠️ Sem imageData, tentando getImageFile...');
                try {
                  const imageFile = await ApiService.product.getImageFile(primeiraImagem.id);
                  return {
                    ...product,
                    imageUrl: imageFile
                  };
                } catch (fileError) {
                  console.error('❌ Erro ao buscar arquivo:', fileError);
                  return {
                    ...product,
                    imageUrl: "/img/forza5.jpg"
                  };
                }
              }
            } else {
              console.log('⚠️ Nenhuma imagem encontrada para o produto', product.id);
              return {
                ...product,
                imageUrl: "/img/forza5.jpg"//error imagem
              };
            }
          } catch (error) {
            console.error('❌ Erro ao buscar imagem do produto:', error);
            return {
              ...product,
              imageUrl: "/img/forza5.jpg" //error imagem
            };
          }
        });

        const produtosComImagensResult = await Promise.all(produtosComImagensPromises);
        
        //  ATUALIZA a lista de produtos com as imagens
        setProdutosList(produtosComImagensResult);
        console.log('🎉 TODOS os produtos com imagens:', produtosComImagensResult);
      }
      
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

  const reloadProdutos = (page = 0, limit = initialLimit) => {
    fetchProdutos(page, limit);
  };

  return {
    produtosList,
    loading,
    error,
    reloadProdutos,
    fetchProdutos
  };
}