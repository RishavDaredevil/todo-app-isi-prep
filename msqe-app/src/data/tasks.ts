export interface Task {
  id: number;
  text: string;
  completed: boolean;
  dates: string[];
  isHeading?: boolean;
  isSubHeading?: boolean;
}

export interface Phase {
  id: number;
  title: string;
  tasks: Task[];
}

export const initialPhases: Phase[] = [
  {
    id: 1,
    title: "Phase 1: Foundational Understanding & Revision",
    tasks: [
      { id: 1, text: "Mathematics", completed: false, dates: [], isHeading: true },
      { id: 2, text: "Algebra, Linear Algebra & Calculus (Revision)", completed: false, dates: [], isSubHeading: true },
      { id: 3, text: "Go through your Ecopoint course notes for all math topics.", completed: false, dates: [] },
      { id: 4, text: 'Use Sydsaeter & Hammond, "Mathematics for Economic Analysis" to revise concepts.', completed: false, dates: [] },
      { id: 5, text: 'Solve problems from "TOMATO" (Test of Mathematics at the 10+2 Level).', completed: false, dates: [] },
      { id: 6, text: "Probability & Statistics (New Topics)", completed: false, dates: [], isSubHeading: true },
      { id: 7, text: "Study the syllabus for Elementary Probability and Statistics thoroughly.", completed: false, dates: [] },
      { id: 8, text: "Watch Ecopoint's prep course lectures dedicated to these new topics.", completed: false, dates: [] },
      { id: 9, text: "Microeconomics", completed: false, dates: [], isHeading: true },
      { id: 10, text: "Read Hal Varian's 'Intermediate Microeconomics' for a clear conceptual understanding.", completed: false, dates: [] },
      { id: 11, text: "Supplement reading with Ecopoint's 'Intermediate Microeconomics I & II' video playlists.", completed: false, dates: [] },
      { id: 12, text: "Start creating concise notes for each topic.", completed: false, dates: [] },
      { id: 13, text: "Macroeconomics", completed: false, dates: [], isHeading: true },
      { id: 14, text: "Read N. Gregory Mankiw's 'Macroeconomics' for a strong, intuitive foundation.", completed: false, dates: [] },
      { id: 15, text: "Watch the relevant Ecopoint lectures to solidify your understanding.", completed: false, dates: [] },
      { id: 16, text: "Begin compiling notes, focusing on the core models and theories.", completed: false, dates: [] },
    ],
  },
  {
    id: 2,
    title: "Phase 2: Deep Dive & Rigorous Application",
    tasks: [
      { id: 17, text: "Microeconomics", completed: false, dates: [], isHeading: true },
      { id: 18, text: "For mathematical rigor, study Nicholson & Snyder's 'Microeconomic Theory'.", completed: false, dates: [] },
      { id: 19, text: "Work through the problems in Varian's 'Workouts in Intermediate Microeconomics'.", completed: false, dates: [] },
      { id: 20, text: "Macroeconomics", completed: false, dates: [], isHeading: true },
      { id: 21, text: "Use Dornbusch & Fischer's 'Macroeconomics' for deeper model analysis.", completed: false, dates: [] },
    ],
  },
  {
    id: 3,
    title: "Phase 3: Practice & Exam Simulation",
    tasks: [
      { id: 22, text: "Past Year Questions (PYQs)", completed: false, dates: [], isHeading: true },
      { id: 23, text: "Solve all available ISI MSQE Past Year Question Papers.", completed: false, dates: [] },
      { id: 24, text: "Mock Tests & Final Revision", completed: false, dates: [], isHeading: true },
      { id: 25, text: "Take mock tests to get accustomed to the exam pattern and time constraints.", completed: false, dates: [] },
      { id: 26, text: "Regularly revise all your notes for every subject.", completed: false, dates: [] },
    ],
  },
];
