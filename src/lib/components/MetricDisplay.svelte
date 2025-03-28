<script lang="ts">
	import { formatNumber } from '$lib/utils/formatting';

	let {
        label,
        value,
        unit = 'kr',
        showChange = false,
        changeValue = 0
    } = $props<{
		label: string;
		value: number | null | undefined;
		unit?: string;
        showChange?: boolean;
        changeValue?: number;
	}>();

    let formattedValue = $derived(formatNumber(value) + (unit && value != null ? ` ${unit}` : ''));
    let formattedChange = $derived(formatNumber(changeValue));
    let changeColorClass = $derived(
        changeValue > 0 ? 'change-positive' :
        changeValue < 0 ? 'change-negative' :
        'change-neutral'
    );
    let changeSign = $derived(changeValue > 0 ? '+' : ''); // Negativt tecken hanteras av formatNumber

</script>

<div class="metric-display">
	<p class="metric-label">{label}</p>
	<p class="metric-value">{formattedValue}</p>
    {#if showChange && changeValue !== 0}
        <p class="metric-change {changeColorClass}">{changeSign}{formattedChange}</p>
    {/if}
</div>

<style>
    .metric-display {
        padding: 0.5rem; /* p-2 */
    }
    .metric-label {
        font-size: 0.875rem; /* text-sm */
        color: var(--shb-gray-medium);
        margin: 0 0 0.1rem 0;
    }
    .metric-value {
        font-size: 1.125rem; /* text-lg */
        font-weight: 600; /* font-semibold */
        margin: 0;
    }
    .metric-change {
        font-size: 0.875rem; /* text-sm */
        margin: 0;
    }
    .change-positive {
        color: #2f855a; /* Någon grön färg, t.ex. text-green-600 */
    }
    .change-negative {
        color: var(--shb-red);
    }
    .change-neutral {
        color: var(--shb-gray-medium);
    }
</style>