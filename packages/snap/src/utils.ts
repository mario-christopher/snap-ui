import { FlightDetailForm } from "./components/flight/detail";
import { FlightNameForm } from "./components/flight/name";

export type Booking = {
  [FlightNameForm.InputFirstName]: string;
  [FlightNameForm.InputLastName]: string;

  [FlightDetailForm.InputDate]: string;
  [FlightDetailForm.SelectFrom]: string;
  [FlightDetailForm.SelectTo]: string;
}

export type Member = {
  firstName: string;
  lastName: string;
  frequentFlyerNo: string;
  memberSince: string
  miles: string;
}

export type SnapState = {
  member: Member;
  booking?: Booking;
  airportCodes: AirportCode[];
  flightHistory: Flight[];
  historyPageNo: number;
}

export type ErrorProps = {
  errors?: string[];
};

export type AirportCode = {
  value: string;
  cityName: string;
}

export type Flight = {
  date: string;
  from: string;
  to: string;
}

export type Props = {
  errors?: string[];
  snapState: SnapState;
}

export async function getMemberInfo() {
  //  mimic API Call
  return {
    firstName: "John",
    lastName: "Smith",
    frequentFlyerNo: "JHF8756J",
    memberSince: new Date("11/23/2003").toDateString(),
    miles: "10,306"
  } as Member
}

export async function getAirportCodes() {
  return [
    { value: "NYC", cityName: "New York" },
    { value: "LHR", cityName: "London" },
    { value: "CDG", cityName: "Paris" },
    { value: "MUM", cityName: "Mumbai" },
    { value: "BRU", cityName: "Brussels" },
  ] as AirportCode[]
}

export async function getFlightHistory() {
  return [
    { date: "01/19/2024", from: "NYC", to: "LHR" },
    { date: "04/10/2024", from: "BRU", to: "LHR" },
    { date: "01/02/2024", from: "MUM", to: "NYC" },
    { date: "08/24/2024", from: "NYC", to: "MUM" },
    { date: "11/22/2022", from: "NYC", to: "CDG" },
    { date: "12/10/2022", from: "BRU", to: "LHR" },
    { date: "11/12/2022", from: "LHR", to: "NYC" },
    { date: "01/18/2022", from: "MUM", to: "MUM" },
    { date: "07/30/2022", from: "MUM", to: "CDG" },
    { date: "09/20/2021", from: "BRU", to: "LHR" },
    { date: "04/19/2021", from: "NYC", to: "BRU" },
    { date: "06/11/2021", from: "LHR", to: "MUM" },
    { date: "11/13/2021", from: "CDG", to: "LHR" },
    { date: "03/12/2020", from: "CDG", to: "MUM" },
    { date: "08/15/2020", from: "NYC", to: "BRU" },
    { date: "01/20/2020", from: "MUM", to: "LHR" },
    { date: "09/10/2020", from: "BRU", to: "NYC" },
    { date: "01/20/2020", from: "MUM", to: "LHR" },
    { date: "09/10/2020", from: "BRU", to: "NYC" },
  ] as Flight[];
}