interface CoordInfo {
  name: string;
  isActive: boolean;
  grade: string;
  image: string;
  study?: string;
  personalLink?: string;
  github?: string;
  linkedIn?: string;
  bio?: string;
}

let CoordsBio: CoordInfo[] = [
  {
    name: "Michael Berkey",
    isActive: true,
    grade: "Senior",
    study: "CS",
    github: "mdberkey",
    linkedIn: "michael-berkey1",
    bio: "O_o",
    image: "michael-berkey.png"
  },
  {
    name: "Michael Gira",
    isActive: true,
    grade: "Super Senior",
    study: "CS & Entrepreneurship",
    personalLink: "https://gira.dev",
    github: "michaelgira23",
    linkedIn: "michael-gira",
    bio: "Ever since I was a little kid I've been deathly afraid of limes. For my birthday, my mother served me key lime pie and I vigorously threw up on my great grandpa. I have not communicated with him since.",
    image: "michael-gira.jpg"
  },
  {
    name: "Nick Winans",
    isActive: false,
    grade: "Senior",
    personalLink: "https://nick.winans.codes",
    bio: "I commit tax fraud.",
    image: "nick-winans.jpg"
  },
  {
    name: "Rudy Banerjee",
    isActive: true,
    grade: "Junior",
    study: "CE/CS",
    personalLink: "https://github.com/rudyb2001",
    bio: "I am a sophomore at UW Madison studying computer science. I have background in computer vision and other stuff. I have never written a line of JavaScript before, but that may change soon.",
    image: "rudy-banerjee.jpg"
  },
  {
    name: "Pranav Dronavalli",
    isActive: true,
    grade: "Junior",
    study: "CS/Math",
    personalLink: "https://github.com/dronavallipranav",
    bio: "Expert on system design&#41 (deciding whether to use a relational or non-relational DB for a comprehensive pokedex)",
    image: "will-woods.jpg"
  },
  {
    name: "Rudy Banerjee",
    isActive: true,
    grade: "Junior",
    study: "CE/CS",
    personalLink: "https://github.com/rudyb2001",
    bio: "I am a sophomore at UW Madison studying computer science. I have background in computer vision and other stuff. I have never written a line of JavaScript before, but that may change soon.",
    image: "phoenix-kahlo.jpg"
  },
  {
    name: "Rudy Banerjee",
    isActive: true,
    grade: "Junior",
    study: "CE/CS",
    personalLink: "https://github.com/rudyb2001",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "michael-gira.jpg"
  },
  {
    name: "Rudy Banerjee",
    isActive: true,
    grade: "Junior",
    study: "CE/CS",
    personalLink: "https://github.com/rudyb2001",
    bio: "I am a sophomore at UW Madison studying computer science. I have background in computer vision and other stuff. I have never written a line of JavaScript before, but that may change soon.",
    image: "michael-gira.jpg"
  },
  {
    name: "Rudy Banerjee",
    isActive: true,
    grade: "Junior",
    study: "CE/CS",
    personalLink: "https://github.com/rudyb2001",
    bio: "I am a sophomore at UW Madison studying computer science. I have background in computer vision and other stuff. I have never written a line of JavaScript before, but that may change soon.",
    image: "michael-gira.jpg"
  },
  {
    name: "Rudy Banerjee",
    isActive: true,
    grade: "Junior",
    study: "CE/CS",
    personalLink: "https://github.com/rudyb2001",
    bio: "I am a sophomore at UW Madison studying computer science. I have background in computer vision and other stuff. I have never written a line of JavaScript before, but that may change soon.",
    image: "michael-gira.jpg"
  },
];

export default CoordsBio;
export type { CoordInfo };
