import express from 'express'
import  { deleteUser, getAllUsers, getUser, updatedUser } from '../controllers/user.js'
import  { verifyAdmin,  verifyUser }  from '../utils/verifyToken.js'; 

const router = express.Router();

//Authenticate or verify the  jwt token//
/*router.get('/checkauthentication', verifyToken, (req,res,next) => {
    res.send('hello user, you are logged in')
}); 

//verify or authenticate that is user or admin//
router.get('/checkuser/:id', verifyUser, (req,res,next) => {
    res.send('hello user, you are logged in and you can delete your account')
});

//verify the admin//
router.get('/checkadmin/:id', verifyAdmin, (req,res,next) => {
    res.send('hello user, you are logged in and you can delete all account')
});
*/

//Update user//
router.put('/:id', verifyUser, updatedUser);

//Delete user//
router.delete('/:id', verifyUser, deleteUser);

//Get user//
router.get('/:id', getUser); 

//Get all user//
router.get('/', verifyAdmin, getAllUsers);
 
export default router;