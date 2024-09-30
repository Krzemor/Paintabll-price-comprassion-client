import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string, category: string, source: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSource, setSelectedSource] = useState('cheerio');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSource(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm, selectedCategory, selectedSource);
    };

    return (
        <div className="search-bar">
            <div className="source-selection">
                <p>Wybierz scraper:</p>
                <label>
                    <input
                        type="radio"
                        value="cheerio"
                        checked={selectedSource === 'cheerio'}
                        onChange={handleSourceChange}
                    />
                    Cheerio
                </label>
                <label>
                    <input
                        type="radio"
                        value="puppeteer"
                        checked={selectedSource === 'puppeteer'}
                        onChange={handleSourceChange}
                    />
                    Puppeteer
                </label>
                <label>
                    <input
                        type="radio"
                        value="playwright"
                        checked={selectedSource === 'playwright'}
                        onChange={handleSourceChange}
                    /> Playwright
                </label>
            </div>
            <input
                type="text"
                placeholder="Wyszukaj produkt"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Wybierz kategorie</option>
                <option value="Loader">Loader</option>
                <option value="Marker">Marker</option>
                <option value="Mask">Maska</option>
            </select>
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
};

export default SearchBar;
