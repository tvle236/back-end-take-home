export class Airport {
    public readonly name: string;
    public readonly city: string;
    public readonly country: string;
    public readonly iata3: string;
    public readonly latitude: number;
    public readonly longitude: number;

    public constructor(name: string,
        city: string,
        country: string,
        iata3: string,
        latitude: number,
        longitude: number) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.iata3 = iata3;
        this.latitude = latitude;
        this.longitude = longitude;

        if (iata3.length !== 3) {
            throw Error(`Provided iata3 "${iata3}" is not 3 characters long`);
        }
    }
}
