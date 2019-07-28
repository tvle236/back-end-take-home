import { CsvModel } from "../models/csvModel";
import { BaseCsvRepo } from "./baseCsvRepo";
import { Airport } from "../models/airport";

export class AirportCsvRepo extends BaseCsvRepo<Airport> {
    public constructor(filePath: string) {
        super(filePath);
    }

    protected csvToModel(csvModel: CsvModel): Airport {
        return new Airport(
            csvModel["Name"],
            csvModel["City"],
            csvModel["Country"],
            csvModel["IATA 3"],
            Number(csvModel["Latitute"]),
            Number(csvModel["Longitude"]))
    }

    protected storeItemsById(airports: Airport[]): Airport[] {
        airports.forEach((airport): void => {
            this.itemsById[airport.iata3] = airport;
        });

        return airports;
    }
}
