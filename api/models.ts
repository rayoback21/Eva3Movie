// src/utils/models.ts
export interface Film {
   
    id: number;
    title: string;
    director:string;
    duration:number;
    releaseDate:string;
    genre: string;
    box_office: number;
    rating: number;
    summary: number;
  }
  
  export interface Scene {
    id: number;
    description: string;
    minutes: number;
    location: string;
    setting: string;
    film_id: number;
  }
  
  export interface Character {
   
    id: number;
    full_name: string;
    description: string;
    cost: number;
    actor: string;
    stock: string;
    rol: string;
  }
  