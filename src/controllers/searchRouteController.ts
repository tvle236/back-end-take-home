import express, { Request, Response, NextFunction } from "express";
import { AirRoute } from "../models/airRoute";
import { getShortestRoute } from "../services/routeService";
import { HttpStatusError } from "../models/httpStatusError";

const router = express.Router();

interface GetShortestRouteResponse {
    found: boolean;
    route: AirRoute[];
}

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const origin: string = req.query.origin || "";
        const destination: string = req.query.destination || "";

        if (!origin) {
            return next(new HttpStatusError(400, "Query string 'origin' is not provided"));
        } else if (!destination) {
            return next(new HttpStatusError(400, "Query string 'destination' is not provided"));
        }

        // Although promises are used, nothing is truly asynchronous. It is used in the event
        // external caches or databases are used to store data, making the transition easier.
        const airRoutePath = await getShortestRoute(origin, destination);
        const body: GetShortestRouteResponse = {
            found: airRoutePath.length > 0,
            route: airRoutePath
        };

        res.status(200)
            .json(body);
        return next();
    } catch (err) {
        return next(err);
    }
});

export {
    router as searchRouteRouter
};
