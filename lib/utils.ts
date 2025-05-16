import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollTo(id: string) {
  const div = document.getElementById(id);

  if (div) {
    div.scrollIntoView({behavior: 'smooth'});
  }
}
