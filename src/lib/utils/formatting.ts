// src/lib/utils/formatting.ts
export function formatNumber(value: number | null | undefined): string {
	if (value === null || value === undefined) {
		return '-';
	}
	const roundedValue = Math.round(value / 100) * 100;
	return roundedValue.toLocaleString('sv-SE', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});
}

export function formatPercentage(value: number | null | undefined, decimals: number = 1): string {
   if (value === null || value === undefined) {
       return '-';
   }
   return (value * 100).toLocaleString('sv-SE', {
       minimumFractionDigits: decimals,
       maximumFractionDigits: decimals,
   }) + ' %';
}