interface CoordHour {
  Time: string;

  // in order: Monday, Tuesday, Wednesday, Thursday, Friday
  Coords: string[];
}

let CoordHours: CoordHour[] = [
  {
    Time: "10 AM - 11 AM",
    Coords: ["", "Michael", "", "", "James"],
  },
  {
    Time: "11 AM - 12 PM",
    Coords: ["Michael", "Matt", "Ben", "Matt", "Michael"],
  },
  {
    Time: "12 PM - 1 PM",
    Coords: ["Reed", "", "Reed", "Phoenix", ""],
  },
  {
    Time: "1 PM - 2 PM",
    Coords: ["James", "Dana", "Eric", "Phoenix", "Eric"],
  },
  {
    Time: "2 PM - 3 PM",
    Coords: ["Berkey", "Dana", "Berkey", "Ben", ""],
  },
  {
    Time: "3 PM - 4 PM",
    Coords: ["Carson", "Nick", "Carson", "Nick", "Rudy"],
  },
  {
    Time: "4 PM - 5 PM",
    Coords: ["", "Will", "", "Will", "Rudy"],
  },
];

export default CoordHours;
