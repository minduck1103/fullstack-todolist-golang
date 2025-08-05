import React from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  BarChart3 
} from 'lucide-react';

export const PlusIcon = ({ className = 'w-4 h-4' }) => (
  <Plus className={className} />
);

export const Trash = ({ className = 'w-4 h-4' }) => (
  <Trash2 className={className} />
);

export const CheckCircle = ({ className = 'w-4 h-4' }) => (
  <CheckCircle2 className={className} />
);

export const CircleIcon = ({ className = 'w-4 h-4' }) => (
  <Circle className={className} />
);

export const CalendarIcon = ({ className = 'w-4 h-4' }) => (
  <Calendar className={className} />
);

export const Stats = ({ className = 'w-4 h-4' }) => (
  <BarChart3 className={className} />
); 