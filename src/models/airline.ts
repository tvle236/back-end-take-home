export class Airline {
    public readonly name: string;
    public readonly digitCode2: string;
    public readonly digitCode3: string;
    public readonly country: string;

    public constructor(name: string,
        digitCode2: string,
        digitCode3: string,
        country: string) {
        this.name = name;
        this.digitCode2 = digitCode2;
        this.digitCode3 = digitCode3;
        this.country = country;

        if (digitCode2.length !== 2) {
            throw Error(`Provided digitCode2 "${digitCode2}" is not 2 characters long`);
        }

        if (digitCode3.length !== 3) {
            throw Error(`Provided digitCode3 "${digitCode3}" is not 3 characters long`);
        }
    }
}
