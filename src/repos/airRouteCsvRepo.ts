import { CsvModel } from "../models/csvModel";
import { BaseCsvRepo } from "./baseCsvRepo";
import { AirRoute } from "../models/airRoute";

export class AirRouteCsvRepo extends BaseCsvRepo<AirRoute> {
    private airRoutesByOrigin: { [name: string]: AirRoute[] }
    private airRoutesByDestination: { [name: string]: AirRoute[] }

    public constructor(filePath: string) {
        super(filePath);
        this.airRoutesByDestination = {};
        this.airRoutesByOrigin = {};
    }

    public getAirRoutesByOrigin(name: string): AirRoute[] {
        return this.airRoutesByOrigin[name] || [];
    }

    public getAirRoutesByDestination(name: string): AirRoute[] {
        return this.airRoutesByDestination[name] || [];
    }

    public getById(id: string): AirRoute {
        throw new Error("getById not implemented, unable to get by id for AirRoutes");
    }

    protected csvToModel(csvModel: CsvModel): AirRoute {
        return new AirRoute(
            csvModel["Airline Id"],
            csvModel["Origin"],
            csvModel["Destination"]);
    }

    protected storeItemsById(airRoutes: AirRoute[]): AirRoute[] {
        // There are no Ids defined by airRoutes
        for (let airRoute of airRoutes) {
            const destinations = this.airRoutesByDestination[airRoute.destination] = (
                this.airRoutesByDestination[airRoute.destination] || []);
            destinations.push(airRoute);

            const origins = this.airRoutesByOrigin[airRoute.origin] = (
                this.airRoutesByOrigin[airRoute.origin] || []);
            origins.push(airRoute);
        }

        return airRoutes;
    }
}
