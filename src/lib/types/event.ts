// src/lib/types/event.ts
export enum EventType {
	StartWork = 'Börja arbeta',
	Promotion = 'Befordran/Löneökning',
	Unemployment = 'Arbetslöshet',
	Sickness = 'Sjukdom',
	ParentalLeave = 'Föräldraledighet',
	HaveChild = 'Få barn',
	Retirement = 'Gå i pension',
	BuyProperty = 'Köpa bostad',
	SellProperty = 'Sälja bostad',
	LargePurchase = 'Större inköp',
	InheritanceGift = 'Arv/Gåva',
	MarriageCohabitation = 'Giftermål/Sambo',
	DivorceSeparation = 'Skilsmässa/Separation',
	StartBusiness = 'Starta eget företag',
	Death = 'Dödsfall'
}

export interface LifeEventBase {
	id: string;
	type: EventType;
	age: number;
	notes?: string;
}

export interface EventStartWork extends LifeEventBase {
	type: EventType.StartWork;
	annualIncome: number;
	incomeIncreaseRate?: number;
}

export interface EventHaveChild extends LifeEventBase {
	type: EventType.HaveChild;
	annualCostIncrease: number;
}

// ... definiera fler interfaces för andra EventType efter behov ...

export type LifeEvent = EventStartWork | EventHaveChild /* | EventPromotion | ... etc */ ;