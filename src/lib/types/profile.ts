// src/lib/types/profile.ts
export interface UserProfile {
	age: number | null;
	currentIncomeNet: number | null;
	currentSavings: number | null;
	currentDebt: number | null;
	civilStatus: 'single' | 'married_registered_partner' | 'cohabiting' | null;
	numberOfChildren: number | null;
}