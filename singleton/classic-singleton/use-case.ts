import { Singleton } from "./singleton";

const singletonA: Singleton = Singleton.getInstance();
const singletonB: Singleton = Singleton.getInstance();

/*
With a classic singleton implementation a class constructor remains private, 
instead a getInstance() static method is exposed, allowing only one instance to be running at a time.
*/

console.log(singletonA === singletonB)