<script lang="ts">
	import type { LifeEvent } from '$lib/types/event';
	let { event } = $props<{ event: LifeEvent }>();
</script>

<div class="event-item">
	<p><strong>{event.type}</strong> vid {event.age} år</p>
	{#if event.notes}
		<p class="event-notes">{event.notes}</p>
	{/if}
	</div>

<style>
    .event-item {
        border-bottom: 1px solid var(--shb-border); /* Flyttad från +page */
        padding: 0.5rem 0; /* py-2 */
        font-size: 0.875rem; /* text-sm */
    }
    /* Stil för sista elementet om det ligger i en lista */
    :global(.event-list-container > .event-item:last-child) {
         border-bottom: none;
    }
    .event-item p {
        margin: 0 0 0.25rem 0; /* Lite marginal mellan rader */
    }
    .event-item p:last-child {
        margin-bottom: 0;
    }
    .event-notes {
        color: var(--shb-gray-medium);
        font-style: italic;
    }
</style>