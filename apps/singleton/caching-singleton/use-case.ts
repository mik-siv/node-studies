import { singletonInstance } from "./singleton";
import { singletonA } from "./first-file";

const singletonB = singletonInstance;

/*
Because Node.js uses caching for exports/imports, 
it's safe to export an instance of a singleton class to be reused between modules.
*/

console.log(singletonA === singletonB);