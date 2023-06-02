import express from 'express';
import { 
    getBooks,
    getBooksById,
    saveBook,
    updateBook,
    deleteBook
} from '../controllers/BookController.js';

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBooksById);
router.post('/books', saveBook);
router.patch('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;