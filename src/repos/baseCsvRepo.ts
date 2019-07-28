import { CsvModel } from "../models/csvModel";
import { parseFile } from "fast-csv";

export abstract class BaseCsvRepo<T> {
    protected items: T[];
    protected itemsById: { [id: string]: T };
    private csvLoaded: boolean;
    private fileName: string;

    protected constructor(fileName: string) {
        this.csvLoaded = false;
        this.fileName = fileName;
        this.items = [];
        this.itemsById = {}
    }

    public getById(id: string): T | undefined {
        return this.itemsById[id];
    }

    public async load(): Promise<T[]> {
        if (this.csvLoaded) {
            return this.items;
        }

        return new Promise<CsvModel[]>((resolve, reject): void => {
            const csvData: CsvModel[] = [];
            parseFile(this.fileName, {headers: true})
                .on("error", (err: Error): void => console.error(`Error occurred parsing ${this.fileName}: ${err}`))
                .on("data", (line: CsvModel): number => csvData.push(line))
                .on("end", (): void => {
                    resolve(csvData);
                    console.log(`Finished loading ${this.fileName}`);
                });
        }).then((csvModels: CsvModel[]): T[] => {
            this.csvLoaded = true;
            return this.storeItemsById(this.items = csvModels.map(this.csvToModel));
        });
    }

    protected abstract csvToModel(csvModel: CsvModel): T

    protected abstract storeItemsById(items: T[]): T[];
}
