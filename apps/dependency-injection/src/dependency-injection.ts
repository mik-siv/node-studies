/*
Dependency injection is a programming pattern
That implies containerizing dependencies
So that later on other classes could reuse the contained entities instead of creating new ones.
Aligns well with singleton pattern.
*/

// Define an interface for the dependency
interface Logger {
    log(message: string): void;
}

// Create a concrete implementation of the dependency
class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

// Create a dependency container
export class DependencyContainer {
    private readonly dependencies = new Map<string, any>();

    register<T>(interfaceName: string, implementation: T): void {
        this.dependencies.set(interfaceName, implementation);
    }

    get<T>(interfaceName: string): T {
        const dependency = this.dependencies.get(interfaceName);
        if (!dependency) {
            throw new Error(`Dependency "${interfaceName}" not registered`);
        }
        return dependency as T;
    }
}

// Create an instance of the dependency container
const container = new DependencyContainer();

// Register the dependency implementation with the container
container.register('Logger', new ConsoleLogger());

// Create a class that requires the dependency
class Greeter {
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    greet(name: string): void {
        this.logger.log(`Hello, ${name}!`);
    }
}

// Inject the dependency into the greeter class
const greeter = new Greeter(container.get('Logger'));
greeter.greet('John Doe');