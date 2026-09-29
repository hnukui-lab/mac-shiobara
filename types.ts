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

export interface DrawingDimension {
  label: string;
  value: string;
}

export interface DrawingMaterial {
  name: string;
  spec: string;
  finish: string;
}

export interface DrawingPart {
  name: string;
  quantity: string;
  size: string;
  material: string;
  note: string;
}

export interface DrawingAnalysis {
  title: string;
  drawingType: string;
  scale: string;
  summary: string;
  dimensions: DrawingDimension[];
  materials: DrawingMaterial[];
  parts: DrawingPart[];
  notes: string[];
  checkpoints: string[];
}
