import { airportCsvRepo, airRouteCsvRepo } from "../repos";
import { AirRoute } from "../models/airRoute";
import { putIntoCache, getFromCache } from "./cacheService";
import { HttpStatusError } from "../models/httpStatusError";

function makeShortestRouteCacheKey(origin: string, destination: string): string {
    return `routeService.shortestRoute.${origin}-->${destination}`;
}

async function getShortestRouteFromCache(origin: string, destination: string): Promise<AirRoute[] | undefined> {
    return origin === destination ?
        [] :
        getFromCache(makeShortestRouteCacheKey(origin, destination));
}

async function putShortestRouteIntoCache(origin: string, destination: string, airRoutePath: AirRoute[]): Promise<boolean> {
    return putIntoCache(makeShortestRouteCacheKey(origin, destination), airRoutePath);
}

function addAirRoute(airRoutePath: AirRoute[], airRouteToAdd: AirRoute): AirRoute[] {
    const newAirRoutePath =  airRoutePath.slice(0)
    newAirRoutePath.push(airRouteToAdd);
    return newAirRoutePath;
}

export async function getShortestRoute(origin: string, destination: string): Promise<AirRoute[]> {
    if (!airportCsvRepo.getById(origin)) {
        throw new HttpStatusError(400, "Invalid Origin");
    } else if (!airportCsvRepo.getById(destination)) {
        throw new HttpStatusError(400, "Invalid Destination");
    }

    const result = await getShortestRouteFromCache(origin, destination);

    if (result) {
        return result;
    }

    const seen = new Set(origin);
    const queue = [origin];
    let next: string | undefined = "";

    while ((next = queue.shift())) {
        let pathFromOriginToNext: AirRoute[];
        let airRoutesFromNext: AirRoute[];
        [pathFromOriginToNext, airRoutesFromNext] = await Promise.all([
            getShortestRouteFromCache(origin, next) as Promise<AirRoute[]>,
            airRouteCsvRepo.getAirRoutesByOrigin(next)]);

        for (let airRouteFromNext of airRoutesFromNext) {
            if (!seen.has(airRouteFromNext.destination)) {
                seen.add(airRouteFromNext.destination);
                queue.push(airRouteFromNext.destination);
                const pathFromOriginToHere = addAirRoute(pathFromOriginToNext, airRouteFromNext);
                await putShortestRouteIntoCache(origin, airRouteFromNext.destination, pathFromOriginToHere);

                if (airRouteFromNext.destination === destination) {
                    return pathFromOriginToHere;
                }
            }
        }
    }

    await putShortestRouteIntoCache(origin, destination, []);
    return [];
}
