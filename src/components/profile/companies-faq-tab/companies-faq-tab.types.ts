export interface CompaniesFaqQuestion {
  question: string;
  id: number;
  answer: string;
}

export interface CompaniesFaqSection {
  title: string;
  id: number;
  questions: CompaniesFaqQuestion[];
}
