import {UserServiceInterface} from './interfaces/user-service.interface';
import {Router, Response, Request} from 'express';

// A controller manages the API routes of our application
export class UserController {
    userRouter: Router;

    constructor(private readonly userService: UserServiceInterface) {
        this.userRouter = Router();
        this.initializeRoutes();
    }

    getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const userList = this.userService.findAll();
            res.status(200).json(userList);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };

    getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: string = req.params.id as string;
            const foundUser = this.userService.find(user);
            res.status(200).json(foundUser);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };

    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const {user} = req.body;
            const createdUser = this.userService.create(user);
            res.status(201).json(createdUser);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const {updatedUser} = req.body;
            const updatedUserData = this.userService.update(id, updatedUser);
            res.status(200).json(updatedUserData);
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            this.userService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: (error as Error).message});
        }
    };

    /*
    To help Express's router to work with a class,
    we need to bind the routes to the corresponding functions on start
     */
    private initializeRoutes() {
        this.userRouter.get('/', this.getAllUsers);
        this.userRouter.get('/:id', this.getUser);
        this.userRouter.post('/', this.createUser);
        this.userRouter.put('/:id', this.updateUser);
        this.userRouter.delete('/:id', this.deleteUser);
    }
}
