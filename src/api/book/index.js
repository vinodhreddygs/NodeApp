import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'// have to import to use token
import { create, index, show, update, destroy, getByTitle, getByIdTitle } from './controller'

const router = new Router()

/**
 * @api {post} /books Create book
 * @apiName CreateBook
 * @apiGroup Book
 * @apiSuccess {Object} book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 */
router.post('/',
  token({ required: true }),//import token and use
  create)

/**
 * @api {get} /books Retrieve books
 * @apiName RetrieveBooks
 * @apiGroup Book
 * @apiUse listParams
 * @apiSuccess {Object[]} books List of books.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  index)

/**
 * @api {get} /books/:id Retrieve book
 * @apiName RetrieveBook
 * @apiGroup Book
 * @apiSuccess {Object} book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 */
router.get('/:bookId',
  token({ required: true }),
  show)

/**
* @api {get} /books/:id Retrieve book by title
* @apiName RetrieveBook
* @apiGroup Book
* @apiSuccess {Object} book Book's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Book not found.
*/
router.get('/title/:bookTitle',
  getByTitle)


/**
* @api {get} /books/:id Retrieve book by Id and title
* @apiName RetrieveBook
* @apiGroup Book
* @apiSuccess {Object} book Book's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Book not found.
*/
router.get('/id/:bookId/title/:bookTitle',
  getByIdTitle)


/**
 * @api {put} /books/:id Update book
 * @apiName UpdateBook
 * @apiGroup Book
 * @apiSuccess {Object} book Book's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Book not found.
 */
router.put('/:bookId',
  token({ required: true }),
  update)

/**
 * @api {delete} /books/:id Delete book
 * @apiName DeleteBook
 * @apiGroup Book
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Book not found.
 */
router.delete('/:bookId',
  token({ required: true }),
  destroy)

export default router
