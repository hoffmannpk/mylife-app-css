<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title = '',
		class: className = '',
		children
	} = $props<{
		title?: string;
		class?: string;
		children?: Snippet<[]>;
	}>();
</script>

<div class="card {className ?? ''}">
	{#if title}
		<div class="card-header">
			<h3 class="card-title">{title}</h3>
		</div>
	{/if}
	<div class="card-body">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.card {
		background-color: white;
		border: 1px solid var(--shb-border);
		border-radius: var(--shb-border-radius);
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}
	.card-header {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--shb-border);
		background-color: var(--shb-gray-light);
	}
	.card-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--shb-gray-dark);
        margin: 0;
	}
	.card-body {
		padding: 1rem;
	}
</style>