export interface Message {
  id: string;
  text: string;
  sender: 'doctor' | 'patient';
  timestamp: Date;
}
