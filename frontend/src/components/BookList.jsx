import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async() => {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
    }

    const deleteBook = async(bookId) => {
        try {
            await axios.delete(`http://localhost:5000/books/${bookId}`);
            getBooks();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    
    <div className='text-end m-10'>
        <Link to="add" className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Tambah</Link>
        
        <div className='m-5 grid grid-cols-1 grid-align-center gap-6 sm:grid-cols-3'>

            {books.map((book) => (
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-5 flex-d" key={book.id}>
                <div className="flex flex-col items-center pb-10">
                    <img src={book.url} alt="book" className='mt-10'/>
                    <h5 className="mb-1 mt-5 text-xl font-medium text-gray-900 dark:text-white">{book.name}</h5>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <Link to={`edit/${book.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</Link>
                        <button onClick={() => deleteBook(book.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Delete</button>
                    </div>
                </div>
                </div>
            ))}

        </div>
    </div>
  )
}

export default BookList