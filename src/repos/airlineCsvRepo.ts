import { CsvModel } from "../models/csvModel";
import { BaseCsvRepo } from "./baseCsvRepo";
import { Airline } from "../models/airline";

export class AirlineCsvRepo extends BaseCsvRepo<Airline> {
    public constructor(filePath: string) {
        super(filePath);
    }

    protected csvToModel(csvModel: CsvModel): Airline {
        return new Airline(
            csvModel["Name"],
            csvModel["2 Digit Code"],
            csvModel["3 Digit Code"],
            csvModel["Country"]);
    }

    protected storeItemsById(airlines: Airline[]): Airline[] {
        airlines.forEach((airline): void => {
            this.itemsById[airline.digitCode2] = airline;
        });

        return airlines;
    }
}
