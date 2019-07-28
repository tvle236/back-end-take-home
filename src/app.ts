import express from "express";
import { searchRouteRouter } from "./controllers/searchRouteController";
import { errorResponseMiddleware } from "./middleware/errorResponseMiddleware";

const app = express();
app.set("port", 8080);

app.use("/search-route", searchRouteRouter);
app.use(errorResponseMiddleware);

export {
    app
}
