import { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL } from '../../utils/API/APIKEY';

const ProductContext = createContext();
const CategorieContext = createContext();

const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/products.json`);
          const data = response.data;
          const productList = Object.keys(data).map((key) => ({
            id: key,
            nama_product: data[key].nama_product,
            items: Object.keys(data[key].items).map((itemKey) => ({
              id: itemKey,
              ...data[key].items[itemKey]
            }))
          }))
          setProducts(productList);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
        

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

const CategorieProvider = ({ children }) => {

    const [category, setCategory] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/categorie.json`);
          const data = response.data;
          if (data) {
            const dataArray = Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            setCategory(dataArray);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);

    return (
        <CategorieContext.Provider value={{ category, setCategory }}>
            {children}
        </CategorieContext.Provider>
    )

}

export { ProductContext, ProductProvider, CategorieProvider, CategorieContext };