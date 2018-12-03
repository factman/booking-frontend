export class Booking {
    public trip: string;
    public destinationFrom: string;
    public destinationTo: string;
    public adult: number;
    public departureDate: string;
    public arrivalDate: string;
    constructor() {
        this.trip = null;
        this.destinationFrom = null;
        this.destinationTo = null;
        this.adult = null;
        this.departureDate = null;
        this.arrivalDate = null;
    }
}
