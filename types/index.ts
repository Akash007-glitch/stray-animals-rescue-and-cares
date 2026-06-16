export interface Animal {
  id: string;
  name: string;
  species: "dog" | "cat";
  age: "puppy-kitten" | "young" | "adult";
  ageText: string;
  breed: string;
  location: "Guwahati" | "Dibrugarh" | "Jorhat";
  locationTag: string;
  image: string;
  story: string;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  role: string;
  reason: string;
}

export interface DonateFormData {
  name: string;
  email: string;
  phone: string;
  amount: string;
  customAmount: string;
}
