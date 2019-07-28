import { initializeRepo } from "./repos";
import { app } from "./app";
import { Server } from "http";

initializeRepo().then((): Server => {
    return app.listen(app.get("port"), (): void => {
        console.log(`Server running on http://localhost:${app.get("port")}`);
        console.log("Press CTRL + C to stop the server");
    });
}).catch((error): void => {
    console.error(`Failed to run server due to: ${error}`);
});
