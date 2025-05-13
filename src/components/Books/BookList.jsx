import axios from "axios";
import { useEffect, useState } from 'react';
import BookCard from './BookCard';

const BookList = ({booksData, setBooksData}) => {
    const [searchValue, setSearchValue] = useState("");

    const eventHandler = (id) => {
        console.log('read more button was clicked', id);
    };

    const handleToggleFields = (id, fieldName) => {  // two parameters
        const book = booksData.find((b)=> b.id === id);
        if (!book) return;

        const updatedField = {[fieldName] : !book[fieldName]};

        axios.patch(`http://localhost:3004/books/${id}`, updatedField).then((res) => {setBooksData(prev=>prev.map(b=>b.id===id ? {...b, ...updatedField} : b))}).catch(err=>console.error(`Failed to update ${fieldName}:`, err));
    };
    
    const handlePriceChange = (id, newPrice) => {
        axios.patch(`http://localhost:3004/books/${id}`, {price: newPrice,}).then((res)=>{setBooksData((prevState) => 
            prevState.map((b) => (b.id === id ? {...b, price: res.data }: b))
            );
        }).catch((err) => {
            console.error("Failed to update price:", err);
        });
    };

    const searchHandle = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredBooks = booksData.filter(book => {
        const search = searchValue.toLowerCase();
        return (
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search)
        );
    });


    return (
        <>
            <div className="books">
                <h1>Books catalog</h1>
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" value={searchValue} onChange={searchHandle} />

            <p>Your search word is: {searchValue}</p>

                <div className="boxes">
                    {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                    <BookCard key={book.id} {...book} 
                    onEventHandler={() => eventHandler(book.id)} 
                    onToggleStock = {() => handleToggleFields(book.id, 'inStock')} 
                    onToggleFavorite = {() => handleToggleFields(book.id, 'isFavorite')}
                    onPriceChange = {(id, newPrice) => handlePriceChange(id, newPrice)}
                     />
                    ))
                    ) : (
                    <p>No matching books found. Try another search.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookList;