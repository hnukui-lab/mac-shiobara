export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface JobPost {
  title: string;
  type: string;
  location: string;
  salary: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}
