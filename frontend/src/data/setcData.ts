// Auto-generated SETC Datasets from official sources (tnstc.in & tamilvandi.com)
export interface SetcReservationCentreItem {
  id: number;
  name: string;
  counterAddress: string;
  district: string;
  lat: number;
  lon: number;
}

export interface SetcDepotItem {
  id: number;
  name: string;
  state: string;
  address: string;
  phone?: string;
  type: string;
  lat: number;
  lon: number;
}

export interface SetcSpecialServiceItem {
  id: number;
  serviceName: string;
  origin: string;
  destination: string;
  periodText: string;
  description: string;
  fare: number;
  distanceKm: number;
  coords: [number, number][];
}

export interface SetcRouteItem {
  id: number;
  routeCode: string;
  origin: string;
  destination: string;
  stops: string;
  distance: number;
  travelTime: string;
  serviceType: string;
  fare: number;
  coords: [number, number][];
}

export const SETC_RESERVATION_CENTRES: SetcReservationCentreItem[] = [
  {
    "name": "Aranthangi",
    "counterAddress": "S.E.T.C Reservation Centre, Aranthangi Bus Stand",
    "district": "Pudukkottai",
    "lat": 9.9774,
    "lon": 78.9959,
    "id": 1
  },
  {
    "name": "Bangalore - Shanti Nagar",
    "counterAddress": "S.E.T.C Reservation Counter, BMTC Bus Stand, Shanti Nagar, Bangalore",
    "district": "Bengaluru Urban",
    "lat": 12.9546,
    "lon": 77.5925,
    "id": 2
  },
  {
    "name": "Chennai - CMBT",
    "counterAddress": "CMBT, Mofussil Bus Stand, Koyambedu, Chennai - 600 107",
    "district": "Chennai",
    "lat": 13.0694,
    "lon": 80.2052,
    "id": 3
  },
  {
    "name": "Chennai - Perungalathur",
    "counterAddress": "Perungalathur Bus Stand, S.E.T.C Counter, Chennai",
    "district": "Chengalpattu",
    "lat": 12.9056,
    "lon": 80.0827,
    "id": 4
  },
  {
    "name": "Chennai - Tambaram BS",
    "counterAddress": "S.E.T.C Bus Stand, Tambaram, Chennai - 600 045",
    "district": "Chengalpattu",
    "lat": 12.9249,
    "lon": 80.1198,
    "id": 5
  },
  {
    "name": "Chennai - Thiruvanmiyur",
    "counterAddress": "No.58, Basement Of Masjid Complex, Opp Thiruvanmiyur RTO Office, Chennai",
    "district": "Chennai",
    "lat": 12.983,
    "lon": 80.2594,
    "id": 6
  },
  {
    "name": "Chidambaram",
    "counterAddress": "S.E.T.C Bus Stand, Chidambaram",
    "district": "Cuddalore",
    "lat": 11.3992,
    "lon": 79.6934,
    "id": 7
  },
  {
    "name": "Coimbatore",
    "counterAddress": "S.E.T.C Bus Stand, Gandhipuram, Coimbatore - 641 044",
    "district": "Coimbatore",
    "lat": 11.0183,
    "lon": 76.9678,
    "id": 8
  },
  {
    "name": "Cuddalore",
    "counterAddress": "S.E.T.C Bus Stand, Cuddalore",
    "district": "Cuddalore",
    "lat": 11.7508,
    "lon": 79.7667,
    "id": 9
  },
  {
    "name": "Cumbam",
    "counterAddress": "S.E.T.C Reservation Counter, Municipal Bus Stand, Cumbam",
    "district": "Theni",
    "lat": 9.7344,
    "lon": 77.2809,
    "id": 10
  },
  {
    "name": "Devakottai",
    "counterAddress": "Devakottai Bus Stand, Devakottai - 630 302",
    "district": "Sivagangai",
    "lat": 9.9469,
    "lon": 78.8258,
    "id": 11
  },
  {
    "name": "Dindigul",
    "counterAddress": "S.E.T.C Bus Stand, Dindigul",
    "district": "Dindigul",
    "lat": 10.3673,
    "lon": 77.9803,
    "id": 12
  },
  {
    "name": "Ernakulam Bus Stand",
    "counterAddress": "KSRTC Bus Stand, Ernakulam - 682 035",
    "district": "Ernakulam (Kerala)",
    "lat": 9.9723,
    "lon": 76.2862,
    "id": 13
  },
  {
    "name": "Gudalur (Ooty)",
    "counterAddress": "12/849, Opp To New Bus Stand, Mysore Road, Gudalur (Ooty)",
    "district": "Nilgiris",
    "lat": 11.5065,
    "lon": 76.4925,
    "id": 14
  },
  {
    "name": "Hosur",
    "counterAddress": "New Bus Stand, Municipal Bus Stand, Hosur",
    "district": "Krishnagiri",
    "lat": 12.735,
    "lon": 77.8286,
    "id": 15
  },
  {
    "name": "Karur",
    "counterAddress": "S.E.T.C Reservation Counter, Karur Central Bus Stand",
    "district": "Karur",
    "lat": 10.9575,
    "lon": 78.0766,
    "id": 16
  },
  {
    "name": "Kodaikanal",
    "counterAddress": "Shop No: 36, New Bus Stand Complex, 1st Floor, Kodaikanal",
    "district": "Dindigul",
    "lat": 10.2381,
    "lon": 77.4892,
    "id": 17
  },
  {
    "name": "Kovilpatti",
    "counterAddress": "5, Anna Bus Stand, Kovilpatti Bus Stand",
    "district": "Thoothukudi",
    "lat": 9.1724,
    "lon": 77.8687,
    "id": 18
  },
  {
    "name": "Kumbakonam",
    "counterAddress": "Municipal New Bus Stand, Kumbakonam - 612 001",
    "district": "Thanjavur",
    "lat": 10.9602,
    "lon": 79.3845,
    "id": 19
  },
  {
    "name": "Madurai - Mattuthavani",
    "counterAddress": "Mattuthavani Integrated Bus Stand, Madurai - 625 007",
    "district": "Madurai",
    "lat": 9.9328,
    "lon": 78.1565,
    "id": 20
  },
  {
    "name": "Madurai - Periyar BS",
    "counterAddress": "Periyar Bus Stand, Madurai - 625 003",
    "district": "Madurai",
    "lat": 9.9178,
    "lon": 78.1147,
    "id": 21
  },
  {
    "name": "Marthandam",
    "counterAddress": "Municipal Bus Stand, Marthandam - 629 165",
    "district": "Kanyakumari",
    "lat": 8.3039,
    "lon": 77.2185,
    "id": 22
  },
  {
    "name": "Mayiladuthurai",
    "counterAddress": "Municipal New Bus Stand, Mayiladuthurai - 609 001",
    "district": "Mayiladuthurai",
    "lat": 11.1018,
    "lon": 79.6522,
    "id": 23
  },
  {
    "name": "Nagapattinam",
    "counterAddress": "Municipal Bus Stand, Velippalayam, Nagapattinam - 611 001",
    "district": "Nagapattinam",
    "lat": 10.7656,
    "lon": 79.8428,
    "id": 24
  },
  {
    "name": "Nagercoil - Vadasery",
    "counterAddress": "Christopher Bus Stand, Vadaseri, Nagercoil - 629 001",
    "district": "Kanyakumari",
    "lat": 8.1878,
    "lon": 77.4326,
    "id": 25
  },
  {
    "name": "Namakkal",
    "counterAddress": "Namakkal Bus Stand, Namakkal - 637 001",
    "district": "Namakkal",
    "lat": 11.2189,
    "lon": 78.1674,
    "id": 26
  },
  {
    "name": "Neyveli",
    "counterAddress": "Neyveli Central Bus Stand, Neyveli Township - 607 803",
    "district": "Cuddalore",
    "lat": 11.5975,
    "lon": 79.4861,
    "id": 27
  },
  {
    "name": "Ooty",
    "counterAddress": "S.E.T.C Reservation Counter, Municipal Bus Stand, Ooty",
    "district": "Nilgiris",
    "lat": 11.4064,
    "lon": 76.7001,
    "id": 28
  },
  {
    "name": "Palani",
    "counterAddress": "S.E.T.C Reservation Counter, Municipal Bus Stand, Palani",
    "district": "Dindigul",
    "lat": 10.45,
    "lon": 77.5186,
    "id": 29
  },
  {
    "name": "Paramakudi",
    "counterAddress": "S.E.T.C Reservation Counter, Paramakudi Bus Stand",
    "district": "Ramanathapuram",
    "lat": 9.5447,
    "lon": 78.5914,
    "id": 30
  },
  {
    "name": "Pollachi",
    "counterAddress": "S.E.T.C Reservation Counter, Municipal Bus Stand, Pollachi",
    "district": "Coimbatore",
    "lat": 10.658,
    "lon": 77.0084,
    "id": 31
  },
  {
    "name": "Ponnamaravathi",
    "counterAddress": "No.100, Nangu Road, Pon-Pudupettai, Ponnamaravathi - 622 408",
    "district": "Pudukkottai",
    "lat": 10.2386,
    "lon": 78.5303,
    "id": 32
  },
  {
    "name": "Puducherry",
    "counterAddress": "Rajiv Gandhi Central Bus Stand, Maraimalai Adigal Salai, Puducherry - 605 001",
    "district": "Puducherry (UT)",
    "lat": 11.9272,
    "lon": 79.8144,
    "id": 33
  },
  {
    "name": "Rajapalayam",
    "counterAddress": "S.E.T.C Reservation Counter, Municipal Bus Stand, Rajapalayam",
    "district": "Virudhunagar",
    "lat": 9.4533,
    "lon": 77.5539,
    "id": 34
  },
  {
    "name": "Rameswaram",
    "counterAddress": "Municipal Bus Stand, Rameswaram - 623 526",
    "district": "Ramanathapuram",
    "lat": 9.2876,
    "lon": 79.3129,
    "id": 35
  },
  {
    "name": "Ramanathapuram (Ramnad)",
    "counterAddress": "S.E.T.C Reservation Counter, Municipal Bus Stand, Ramanathapuram",
    "district": "Ramanathapuram",
    "lat": 9.3676,
    "lon": 78.8358,
    "id": 36
  },
  {
    "name": "Salem",
    "counterAddress": "Corporation New Bus Stand, Achavan Lake, Salem - 636 004",
    "district": "Salem",
    "lat": 11.6643,
    "lon": 78.146,
    "id": 37
  },
  {
    "name": "Sayalkudi",
    "counterAddress": "S.E.T.C Reservation Counter, Bus Stand, Sayalkudi",
    "district": "Ramanathapuram",
    "lat": 9.1895,
    "lon": 78.3491,
    "id": 38
  },
  {
    "name": "Sivakasi",
    "counterAddress": "NRK Rajarathinam Bus Stand Complex, Sivakasi - 626 189",
    "district": "Virudhunagar",
    "lat": 9.4532,
    "lon": 77.7972,
    "id": 39
  },
  {
    "name": "Thanjavur",
    "counterAddress": "S.E.T.C Bus Stand, Thanjavur - 613 001",
    "district": "Thanjavur",
    "lat": 10.787,
    "lon": 79.1378,
    "id": 40
  },
  {
    "name": "Theni",
    "counterAddress": "S.E.T.C Bus Stand, Theni",
    "district": "Theni",
    "lat": 10.0104,
    "lon": 77.4768,
    "id": 41
  },
  {
    "name": "Thisayanvilai",
    "counterAddress": "S.E.T.C Bus Stand, Thisayanvilai",
    "district": "Tirunelveli",
    "lat": 8.3378,
    "lon": 77.8681,
    "id": 42
  },
  {
    "name": "Tiruchendur",
    "counterAddress": "10, Municipal Bus Stand Shopping Complex, Tiruchendur - 628 215",
    "district": "Thoothukudi",
    "lat": 8.496,
    "lon": 78.1228,
    "id": 43
  },
  {
    "name": "Tirunelveli - New Bus Stand",
    "counterAddress": "Municipal Bus Stand, Tirunelveli Junction / Venthankulam, Tirunelveli - 627 001",
    "district": "Tirunelveli",
    "lat": 8.7139,
    "lon": 77.7567,
    "id": 44
  },
  {
    "name": "Tirupathi",
    "counterAddress": "Srinivasa Bus Stand, APSRTC Bus Station, Tirupathi - 517 501",
    "district": "Tirupati (Andhra Pradesh)",
    "lat": 13.6288,
    "lon": 79.4192,
    "id": 45
  },
  {
    "name": "Thiruthuraipoondi",
    "counterAddress": "GG Complex, New Bus Stand, Thiruthuraipoondi",
    "district": "Tiruvarur",
    "lat": 10.5375,
    "lon": 79.645,
    "id": 46
  },
  {
    "name": "Tiruvarur",
    "counterAddress": "S.E.T.C Reservation Centre, Municipal Bus Stand, Tiruvarur",
    "district": "Tiruvarur",
    "lat": 10.7725,
    "lon": 79.6365,
    "id": 47
  },
  {
    "name": "Trichy - MBS",
    "counterAddress": "S.E.T.C Reservation Centre, Municipal Central Bus Stand (MBS), Trichy - 620 001",
    "district": "Tiruchirappalli",
    "lat": 10.7937,
    "lon": 78.6853,
    "id": 48
  },
  {
    "name": "Trivandrum",
    "counterAddress": "KSRTC Bus Stand, Thampanoor, Thiruvananthapuram - 695 502",
    "district": "Thiruvananthapuram (Kerala)",
    "lat": 8.4875,
    "lon": 76.9532,
    "id": 49
  },
  {
    "name": "Tuticorin Bus Stand",
    "counterAddress": "S.E.T.C Reservation Centre, New Bus Stand, Tuticorin - 628 002",
    "district": "Thoothukudi",
    "lat": 8.8053,
    "lon": 78.1348,
    "id": 50
  },
  {
    "name": "Udangudi",
    "counterAddress": "S.E.T.C Reservation Centre, Mutharam Travels, Bus Stand Building, Udankudi",
    "district": "Thoothukudi",
    "lat": 8.4358,
    "lon": 78.0531,
    "id": 51
  },
  {
    "name": "Udumalaipet",
    "counterAddress": "S.E.T.C Reservation Centre, 21/3, Bye Pass Road, Near New Bus Stand, Udumalpet - 642 126",
    "district": "Tiruppur",
    "lat": 10.5847,
    "lon": 77.2478,
    "id": 52
  },
  {
    "name": "Usilampatti",
    "counterAddress": "S.E.T.C Reservation Centre, Near Usilampatti Bus Stand, Usilampatti - 625 527",
    "district": "Madurai",
    "lat": 9.9678,
    "lon": 77.795,
    "id": 53
  },
  {
    "name": "Valliyoor (Nagercoil)",
    "counterAddress": "S.E.T.C Reservation Counter, Municipal Bus Stand, Valliyur",
    "district": "Tirunelveli",
    "lat": 8.3817,
    "lon": 77.6156,
    "id": 54
  },
  {
    "name": "Vedaranyam",
    "counterAddress": "S.E.T.C Reservation Counter, Opp Bus Stand, Vedaranyam",
    "district": "Nagapattinam",
    "lat": 10.3742,
    "lon": 79.8519,
    "id": 55
  },
  {
    "name": "Velankanni",
    "counterAddress": "S.E.T.C Bus Stand, Velankanni",
    "district": "Nagapattinam",
    "lat": 10.6806,
    "lon": 79.8456,
    "id": 56
  },
  {
    "name": "Virudhunagar",
    "counterAddress": "S.E.T.C Reservation Counter, Near New Bus Stand, Virudhunagar",
    "district": "Virudhunagar",
    "lat": 9.5872,
    "lon": 77.9514,
    "id": 57
  }
];

export const SETC_DEPOTS: SetcDepotItem[] = [
  {
    "name": "Chennai Depot A",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Pallavan Salai / CMBT Koyambedu, Chennai",
    "phone": "9445014407",
    "lat": 13.0694,
    "lon": 80.2052,
    "id": 1
  },
  {
    "name": "Chennai Depot B",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "CMBT Koyambedu, Chennai",
    "phone": "9445014408",
    "lat": 13.071,
    "lon": 80.207,
    "id": 2
  },
  {
    "name": "Chennai Depot C",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "CMBT Koyambedu, Chennai",
    "phone": "9445014409",
    "lat": 13.0725,
    "lon": 80.2085,
    "id": 3
  },
  {
    "name": "Puducherry Depot",
    "state": "Puducherry",
    "type": "depot",
    "address": "Maraimalai Adigal Salai, Rajiv Gandhi Bus Stand, Puducherry",
    "phone": "9445014412",
    "lat": 11.9272,
    "lon": 79.8144,
    "id": 4
  },
  {
    "name": "Trichy Central Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Mannarpuram / Central Bus Stand, Trichy",
    "phone": "9445014421",
    "lat": 10.7937,
    "lon": 78.6853,
    "id": 5
  },
  {
    "name": "Thanjavur Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "New Bus Stand, Thanjavur",
    "phone": "9445014417",
    "lat": 10.787,
    "lon": 79.1378,
    "id": 6
  },
  {
    "name": "Nagapattinam Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Velippalayam, Nagapattinam",
    "phone": "9445014419",
    "lat": 10.7656,
    "lon": 79.8428,
    "id": 7
  },
  {
    "name": "Kumbakonam Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "New Bus Stand, Kumbakonam",
    "phone": "9445014418",
    "lat": 10.9602,
    "lon": 79.3845,
    "id": 8
  },
  {
    "name": "Madurai Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Mattuthavani Bus Stand, Madurai",
    "phone": "9445014426",
    "lat": 9.9328,
    "lon": 78.1565,
    "id": 9
  },
  {
    "name": "Salem Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Meyyanur / Corporation New Bus Stand, Salem",
    "phone": "9445014447",
    "lat": 11.6643,
    "lon": 78.146,
    "id": 10
  },
  {
    "name": "Coimbatore Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Gandhipuram SETC Bus Stand, Coimbatore",
    "phone": "9445014435",
    "lat": 11.0183,
    "lon": 76.9678,
    "id": 11
  },
  {
    "name": "Tuticorin Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "New Bus Stand, Tuticorin",
    "phone": "9445014430",
    "lat": 8.8053,
    "lon": 78.1348,
    "id": 12
  },
  {
    "name": "Tirunelveli Depot 1",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Vannarpettai / Junction, Tirunelveli",
    "phone": "9445014428",
    "lat": 8.723,
    "lon": 77.734,
    "id": 13
  },
  {
    "name": "Tirunelveli Depot 2",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Palayamkottai, Tirunelveli",
    "phone": "9445014431",
    "lat": 8.718,
    "lon": 77.745,
    "id": 14
  },
  {
    "name": "Nagercoil Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Ranithottam, Nagercoil",
    "phone": "9445014432",
    "lat": 8.1878,
    "lon": 77.4326,
    "id": 15
  },
  {
    "name": "Kanyakumari Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Vivekanandapuram, Kanyakumari",
    "phone": "9445014433",
    "lat": 8.0883,
    "lon": 77.5385,
    "id": 16
  },
  {
    "name": "Marthandam Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Pammam, Marthandam",
    "phone": "9445014434",
    "lat": 8.3039,
    "lon": 77.2185,
    "id": 17
  },
  {
    "name": "Shencottah Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Tenkasi Main Road, Shencottah",
    "phone": "9445014429",
    "lat": 8.9817,
    "lon": 77.2472,
    "id": 18
  },
  {
    "name": "Trivandrum Depot",
    "state": "Kerala",
    "type": "outstation",
    "address": "Thampanoor KSRTC Terminal, Thiruvananthapuram, Kerala",
    "phone": "9443405622",
    "lat": 8.4875,
    "lon": 76.9532,
    "id": 19
  },
  {
    "name": "Dindigul Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Chettinaickenpatti / Bus Stand, Dindigul",
    "phone": "9445014439",
    "lat": 10.3673,
    "lon": 77.9803,
    "id": 20
  },
  {
    "name": "Karaikudi Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Devakottai Rastha, Karaikudi",
    "phone": "9445014458",
    "lat": 10.0667,
    "lon": 78.7833,
    "id": 21
  },
  {
    "name": "Hosur Depot",
    "state": "Tamil Nadu",
    "type": "depot",
    "address": "Rayakottai Road, Hosur",
    "phone": "9445014446",
    "lat": 12.735,
    "lon": 77.8286,
    "id": 22
  }
];

export const SETC_HISTORY_DATA = [
  {
    "yearRange": "1975",
    "fleetCount": 150,
    "title": "Formation of Long Distance Express Wing",
    "description": "Government of Tamil Nadu conceived a dedicated express corporation connecting all district HQs with Chennai. Long distance services of State Transport Dept were transferred to Pallavan Transport Corporation as its Express Wing on 15th Sep 1975.",
    "id": 1
  },
  {
    "yearRange": "1980",
    "fleetCount": 276,
    "title": "Thiruvalluvar Transport Corporation (TTC)",
    "description": "The express wing was registered as an autonomous corporation on 14th January 1980 under the name Thiruvalluvar Transport Corporation Limited (SETC-1).",
    "id": 2
  },
  {
    "yearRange": "1994",
    "fleetCount": 173,
    "title": "Bifurcation for Inter-State Operations",
    "description": "TTC was bifurcated on 27th January 1994 to form PT Dr. J. Jayalalithaa Transport Corporation for exclusive operation of inter-state routes from Tamil Nadu to neighboring states.",
    "id": 3
  },
  {
    "yearRange": "1996 - 1997",
    "fleetCount": 650,
    "title": "Renaming to State Express Transport Corporation (SETC)",
    "description": "Corporations were renamed: TTC became SETC (TN Division I) Ltd on 17th July 1997, and Rajiv Gandhi TC (formerly Jayalalithaa TC) became SETC (TN Division II) Ltd on 30th July 1997.",
    "id": 4
  },
  {
    "yearRange": "2001 - 2002",
    "fleetCount": 950,
    "title": "Amalgamation into Unified SETC Tamil Nadu Ltd",
    "description": "SETC Division II was amalgamated with SETC Division I on 7th February 2002, creating the single unified 'State Express Transport Corporation Tamil Nadu Limited'.",
    "id": 5
  },
  {
    "yearRange": "Present (2024)",
    "fleetCount": 1124,
    "title": "Modernized Fleet with AC & Sleeper Coaches",
    "description": "SETC operates 1,124 premium express coaches (623 Ultra Deluxe, 100 AC Seater, 34 AC Sleeper, 206 AC Seater cum Sleeper, 100 Non-AC Seater cum Sleeper, 59 Classic, and 2 Non-AC Sleeper) linking major commercial, pilgrimage, and metropolitan hubs.",
    "id": 6
  }
];

export const SETC_AWARDS_DATA = [
  {
    "awardName": "Best Performance in Vehicle Productivity",
    "category": "Vehicle Productivity",
    "awardingBody": "ASRTU, New Delhi",
    "years": [
      "1991-92",
      "1992-93",
      "1993-94",
      "1996-97",
      "1997-98",
      "1998-99",
      "2001-02",
      "2003-04",
      "2006-07",
      "2007-08",
      "2008-09",
      "2011-12",
      "2012-13",
      "2013-14",
      "2014-15"
    ],
    "id": 1
  },
  {
    "awardName": "Highest Fuel Efficiency (KMPL Award)",
    "category": "Fuel Economy",
    "awardingBody": "ASRTU, New Delhi",
    "years": [
      "2005-06",
      "2010-11",
      "2011-12",
      "2014-15"
    ],
    "id": 2
  },
  {
    "awardName": "Winner Trophy for Minimum Operational Cost",
    "category": "Cost Optimization",
    "awardingBody": "ASRTU, New Delhi",
    "years": [
      "1994-95"
    ],
    "id": 3
  },
  {
    "awardName": "Improvement in Tyre Performance",
    "category": "Tyre Maintenance",
    "awardingBody": "ASRTU, New Delhi",
    "years": [
      "2002-03",
      "2003-04"
    ],
    "id": 4
  },
  {
    "awardName": "Improvement of Engine Oil Performance",
    "category": "Lubricant Maintenance",
    "awardingBody": "ASRTU, New Delhi",
    "years": [
      "2010-11"
    ],
    "id": 5
  },
  {
    "awardName": "National Energy Conservation Award (Energy Efficiency)",
    "category": "Energy Conservation",
    "awardingBody": "Ministry of Power, Government of India, New Delhi",
    "years": [
      "2014-15"
    ],
    "id": 6
  }
];

export const SETC_SPECIAL_SERVICES: SetcSpecialServiceItem[] = [
  {
    "serviceName": "Velankanni Feast Festival Special",
    "origin": "Chennai",
    "destination": "Velankanni",
    "periodText": "27 August to 09 September Every Year",
    "description": "Round-the-clock express services operated for the annual feast of Our Lady of Good Health Velankanni Basilica.",
    "fare": 485.0,
    "distanceKm": 320.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        79.8456,
        10.6806
      ]
    ],
    "id": 1
  },
  {
    "serviceName": "Sabarimala Pilgrim Mandala-Makaravilakku Special",
    "origin": "Chennai",
    "destination": "Pamba (Sabarimala)",
    "periodText": "November to January Every Year",
    "description": "Direct AC & Ultra Deluxe long-distance special services connecting Chennai, Trichy, and Madurai directly to Pamba base camp.",
    "fare": 850.0,
    "distanceKm": 680.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.6853,
        10.7937
      ],
      [
        78.1565,
        9.9328
      ],
      [
        77.0697,
        9.4
      ]
    ],
    "id": 2
  },
  {
    "serviceName": "Palani Thaipusam Special",
    "origin": "Chennai",
    "destination": "Palani",
    "periodText": "January / February (Thaipusam)",
    "description": "High-frequency pilgrimage express buses for devotees visiting Lord Murugan Dhandayuthapani temple.",
    "fare": 520.0,
    "distanceKm": 475.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.6853,
        10.7937
      ],
      [
        77.9803,
        10.3673
      ],
      [
        77.5186,
        10.45
      ]
    ],
    "id": 3
  },
  {
    "serviceName": "Guruvayur Ekadasi Special",
    "origin": "Chennai",
    "destination": "Guruvayur",
    "periodText": "November to January",
    "description": "Interstate pilgrim connection between Chennai and Guruvayur Temple via Palakkad.",
    "fare": 690.0,
    "distanceKm": 610.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        76.9678,
        11.0183
      ],
      [
        76.04,
        10.59
      ]
    ],
    "id": 4
  },
  {
    "serviceName": "Rameswaram Maha Shivaratri Special",
    "origin": "Chennai",
    "destination": "Rameswaram",
    "periodText": "February / March (Maha Shivaratri)",
    "description": "Express bus fleet connecting northern and central Tamil Nadu to Ramanathaswamy Temple island.",
    "fare": 620.0,
    "distanceKm": 560.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.1565,
        9.9328
      ],
      [
        79.3129,
        9.2876
      ]
    ],
    "id": 5
  },
  {
    "serviceName": "Tirupati Brahmotsavam Special",
    "origin": "Chennai",
    "destination": "Tirupati",
    "periodText": "September / October (Annual Brahmotsavam)",
    "description": "Continuous inter-state services between Chennai CMBT and Tirupati Central Bus Station.",
    "fare": 180.0,
    "distanceKm": 140.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        79.4192,
        13.6288
      ]
    ],
    "id": 6
  }
];

export const SETC_ROUTES_DATA: SetcRouteItem[] = [
  {
    "routeCode": "SETC-101",
    "origin": "Chennai (CMBT)",
    "destination": "Madurai (Mattuthavani)",
    "stops": "Villupuram, Trichy",
    "distance": 450.0,
    "travelTime": "7h 30m",
    "serviceType": "AC Sleeper / Ultra Deluxe",
    "fare": 510.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        79.4861,
        11.9401
      ],
      [
        78.6853,
        10.7937
      ],
      [
        78.1565,
        9.9328
      ]
    ],
    "id": 1
  },
  {
    "routeCode": "SETC-102",
    "origin": "Chennai (CMBT)",
    "destination": "Coimbatore (Gandhipuram)",
    "stops": "Salem, Erode, Tiruppur",
    "distance": 505.0,
    "travelTime": "8h 15m",
    "serviceType": "AC Seater Cum Sleeper / Ultra Deluxe",
    "fare": 560.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.146,
        11.6643
      ],
      [
        77.7274,
        11.341
      ],
      [
        76.9678,
        11.0183
      ]
    ],
    "id": 2
  },
  {
    "routeCode": "SETC-103",
    "origin": "Chennai (CMBT)",
    "destination": "Nagercoil (Vadasery)",
    "stops": "Trichy, Madurai, Tirunelveli",
    "distance": 680.0,
    "travelTime": "11h 00m",
    "serviceType": "AC Sleeper / Ultra Deluxe",
    "fare": 740.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.6853,
        10.7937
      ],
      [
        78.1565,
        9.9328
      ],
      [
        77.7567,
        8.7139
      ],
      [
        77.4326,
        8.1878
      ]
    ],
    "id": 3
  },
  {
    "routeCode": "SETC-104",
    "origin": "Chennai (CMBT)",
    "destination": "Bengaluru (Shanti Nagar)",
    "stops": "Vellore, Hosur",
    "distance": 350.0,
    "travelTime": "6h 00m",
    "serviceType": "Air Conditioned (AC) / Ultra Deluxe",
    "fare": 420.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        79.1325,
        12.9165
      ],
      [
        77.8286,
        12.735
      ],
      [
        77.5925,
        12.9546
      ]
    ],
    "id": 4
  },
  {
    "routeCode": "SETC-105",
    "origin": "Chennai (CMBT)",
    "destination": "Trivandrum (Thampanoor)",
    "stops": "Madurai, Tirunelveli, Nagercoil",
    "distance": 730.0,
    "travelTime": "12h 30m",
    "serviceType": "AC Sleeper",
    "fare": 820.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.1565,
        9.9328
      ],
      [
        77.7567,
        8.7139
      ],
      [
        77.4326,
        8.1878
      ],
      [
        76.9532,
        8.4875
      ]
    ],
    "id": 5
  },
  {
    "routeCode": "SETC-106",
    "origin": "Coimbatore (Gandhipuram)",
    "destination": "Bengaluru (Shanti Nagar)",
    "stops": "Erode, Salem, Hosur",
    "distance": 360.0,
    "travelTime": "6h 30m",
    "serviceType": "Ultra Deluxe / AC Sleeper",
    "fare": 430.0,
    "coords": [
      [
        76.9678,
        11.0183
      ],
      [
        77.7274,
        11.341
      ],
      [
        78.146,
        11.6643
      ],
      [
        77.8286,
        12.735
      ],
      [
        77.5925,
        12.9546
      ]
    ],
    "id": 6
  },
  {
    "routeCode": "SETC-107",
    "origin": "Chennai (CMBT)",
    "destination": "Kanyakumari",
    "stops": "Madurai, Tirunelveli, Nagercoil",
    "distance": 700.0,
    "travelTime": "11h 30m",
    "serviceType": "Ultra Deluxe Classic",
    "fare": 760.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.1565,
        9.9328
      ],
      [
        77.7567,
        8.7139
      ],
      [
        77.4326,
        8.1878
      ],
      [
        77.5385,
        8.0883
      ]
    ],
    "id": 7
  },
  {
    "routeCode": "SETC-108",
    "origin": "Chennai (CMBT)",
    "destination": "Rameswaram",
    "stops": "Trichy, Pudukkottai, Karaikudi, Ramnad",
    "distance": 560.0,
    "travelTime": "9h 30m",
    "serviceType": "Ultra Deluxe",
    "fare": 620.0,
    "coords": [
      [
        80.2052,
        13.0694
      ],
      [
        78.6853,
        10.7937
      ],
      [
        78.8258,
        9.9469
      ],
      [
        78.8358,
        9.3676
      ],
      [
        79.3129,
        9.2876
      ]
    ],
    "id": 8
  }
];
