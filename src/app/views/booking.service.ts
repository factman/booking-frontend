import { CustomDate } from './main/booking-form/customdate.model';

export class BookingService {
    public firstname: string;
    public lastname: string;
    public gender: string;
    public email: string;
    public phone: string;
    public nextName: string;
    public nextPhone: string;
    public seatNumber: string;
    public departure: string;
    public destination: string;
    public amount: number;
    public numberOfBooking: number;
    public dateBooked = new CustomDate();
    constructor() { }
}
