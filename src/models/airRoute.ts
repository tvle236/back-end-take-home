export class AirRoute {
    public readonly airlineDigitCode2: string;
    public readonly origin: string;
    public readonly destination: string;

    public constructor(airlineDigitCode2: string,
        origin: string,
        destination: string) {
        this.airlineDigitCode2 = airlineDigitCode2;
        this.origin = origin;
        this.destination = destination;

        if (airlineDigitCode2.length !== 2) {
            throw Error(`Provided airlineDigitCode2 "${airlineDigitCode2}" is not 2 characters long`);
        }
    }
}
