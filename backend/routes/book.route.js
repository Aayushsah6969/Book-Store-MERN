import express from 'express';
import { deleteBook, getBook, getOneBook, updatebook, uploadBook } from '../controllers/book.controller.js';
import { isAdminMiddleware } from '../Authenticate/AdminMiddleWare.js';
// import {isAdmin} from '../Authenticate/AdminMiddleWare.js';
import upload from '../config/multer.js';

const router = express.Router();

router.get('/getbook', getBook);
router.get('/getonebook/:id', getOneBook);
//need to be protected by middlware since this is to be done by admin only...
router.post('/uploadbook', upload.single('image'),isAdminMiddleware, uploadBook);
// router.post('/uploadbook', isAdminMiddleware,uploadBook);
router.put('/updatebook/:id',isAdminMiddleware,updatebook);
router.delete('/deletebook/:id',isAdminMiddleware,deleteBook);

export default router;