import express, { Request, Response, NextFunction } from "express";
import { searchRouteRouter } from "./controllers/searchRouteController";
import { errorResponseMiddleware } from "./middleware/errorResponseMiddleware";

const app = express();
app.set("port", process.env.PORT || 8080);

app.use("/search-route", searchRouteRouter);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({result: true});
    return next();
});

app.use(errorResponseMiddleware);

export {
    app
}
