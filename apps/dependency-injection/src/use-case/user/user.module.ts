import {DependencyContainer} from '../../dependency-injection';
import {UserRepository} from "./user.repository";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import express from 'express'

//This function will take care of dependency injection in the user application and will bootstrap our app when run
function init() {
    const userDependencyContainer: DependencyContainer = new DependencyContainer();
    userDependencyContainer.register('userRepository', new UserRepository());
    userDependencyContainer.register('userService', new UserService(userDependencyContainer.get('userRepository')));
    userDependencyContainer.register('userController', new UserController(userDependencyContainer.get('userService')));
    const app = express();
    const userControllerInstance: UserController = userDependencyContainer.get('userController')
    app.use(express.json())
    app.use('/user', userControllerInstance.userRouter);
    app.use((req, res, next) => {
        console.log(req, res);
        next()
    })
    app.listen(3000, () => {
        console.log('App started')
    })
}

init();