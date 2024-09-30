import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import '../App.css';

interface Product {
    id: string;
    name: string;
    price: string;
    availability: string;
    url: string;
    imageUrl: string;
    category: string;
}

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productsSP, setProductsSP] = useState<Product[]>([]);
    const [productsVP, setProductsVP] = useState<Product[]>([]);
    const [lowestPriceProductId, setLowestPriceProductId] = useState<string | null>(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = (query: string, category: string, source: string) => {
        setSearchPerformed(true);

        let url = `http://localhost:5000/api/products/search?q=${query}&category=${category}&source=${source}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const convertedProducts = data.products.map((product: any) => ({
                    ...product,
                    id: product._id,
                }));

                const convertedProductsSP = data.productsSP.map((product: any) => ({
                    ...product,
                    id: product._id,
                }));

                const convertedProductsVP = data.productsVP.map((product: any) => ({
                    ...product,
                    id: product._id,
                }));

                console.log('Fetched and converted data:', {
                    products: convertedProducts,
                    productsSP: convertedProductsSP,
                    productsVP: convertedProductsVP,
                });

                setProducts(convertedProducts);
                setProductsSP(convertedProductsSP);
                setProductsVP(convertedProductsVP);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    useEffect(() => {
        const allProducts = [...products, ...productsSP, ...productsVP];
        if (allProducts.length > 0) {
            const lowestProduct = allProducts.reduce((prev, curr) => {
                const prevPrice = parseFloat(prev.price.replace(/[^0-9,.]/g, '').replace(',', '.').trim());
                const currPrice = parseFloat(curr.price.replace(/[^0-9,.]/g, '').replace(',', '.').trim());

                return currPrice < prevPrice ? curr : prev;
            });

            console.log(`Lowest price product ID: ${lowestProduct.id}, price: ${lowestProduct.price}`);
            setLowestPriceProductId(lowestProduct.id);
        }
    }, [products, productsSP, productsVP]);

    return (
        <main>
            <h2>Witamy na Paintball Hunter</h2>
            <p>Znajdź najlepsze ceny sprzętu paintballowego w różnych sklepach internetowych.</p>
            <SearchBar onSearch={handleSearch} />

            {searchPerformed && (
                <div className="product-columns">
                    <div className="product-list">
                        <h3>Assassins Arms</h3>
                        {products.length === 0 ? (
                            <p className="no-products-message">Brak produktów w Assassins Arms dla tego wyszukania.</p>
                        ) : (
                            products.map(product => {
                                const isLowestPrice = product.id === lowestPriceProductId;
                                console.log(`Rendering product ${product.id} from Assassins Arms with price ${product.price}. Is lowest price: ${isLowestPrice}`);
                                return (
                                    <div
                                        key={product.id}
                                        className={`product-card ${isLowestPrice ? 'lowest-price' : ''}`}
                                    >
                                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                                            <img src={product.imageUrl} alt={product.name} />
                                            <h3>{product.name}</h3>
                                        </a>
                                        <p>{product.price}</p>
                                        <p>{product.availability}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="product-list">
                        <h3>Paintball Sklep</h3>
                        {productsSP.length === 0 ? (
                            <p className="no-products-message">Brak produktów w Paintball Sklep dla tego wyszukania.</p>
                        ) : (
                            productsSP.map(product => {
                                const isLowestPrice = product.id === lowestPriceProductId;
                                console.log(`Rendering product ${product.id} from Paintball Sklep with price ${product.price}. Is lowest price: ${isLowestPrice}`);
                                return (
                                    <div
                                        key={product.id}
                                        className={`product-card ${isLowestPrice ? 'lowest-price' : ''}`}
                                    >
                                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                                            <img src={product.imageUrl} alt={product.name} />
                                            <h3>{product.name}</h3>
                                        </a>
                                        <p>{product.price}</p>
                                        <p>{product.availability}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="product-list">
                        <h3>Victory Paintball</h3>
                        {productsVP.length === 0 ? (
                            <p className="no-products-message">Brak produktów w Victory Paintball dla tego wyszukania.</p>
                        ) : (
                            productsVP.map(product => {
                                const isLowestPrice = product.id === lowestPriceProductId;
                                console.log(`Rendering product ${product.id} from Victory Paintball with price ${product.price}. Is lowest price: ${isLowestPrice}`);
                                return (
                                    <div
                                        key={product.id}
                                        className={`product-card ${isLowestPrice ? 'lowest-price' : ''}`}
                                    >
                                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                                            <img src={product.imageUrl} alt={product.name} />
                                            <h3>{product.name}</h3>
                                        </a>
                                        <p>{product.price}</p>
                                        <p>{product.availability}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

export default HomePage;
