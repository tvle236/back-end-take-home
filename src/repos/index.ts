import { AirportCsvRepo } from "./airportCsvRepo";
import { AirlineCsvRepo } from "./airlineCsvRepo";
import { AirRouteCsvRepo } from "./airRouteCsvRepo";
import { join } from "path";

const target = process.env["target"] || "test";

const airlineCsvRepo = new AirlineCsvRepo(join(__dirname, `../../data/${target}/airlines.csv`));
const airportCsvRepo = new AirportCsvRepo(join(__dirname, `../../data/${target}/airports.csv`));
const airRouteCsvRepo = new AirRouteCsvRepo(join(__dirname, `../../data/${target}/routes.csv`));

async function initializeRepo(): Promise<void> {
    return Promise.all([
        airlineCsvRepo.load(),
        airportCsvRepo.load(),
        airRouteCsvRepo.load()
    ]).then();
}

export {
    airportCsvRepo,
    airlineCsvRepo,
    airRouteCsvRepo,
    initializeRepo
}
