<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonVariant = 'primary' | 'secondary' | 'link';

	let {
		variant = 'primary' as ButtonVariant,
		disabled = false,
		onClick = () => {},
		type = 'button' as 'button' | 'submit' | 'reset',
		class: extraClass,
		children
	} = $props<{
		variant?: ButtonVariant;
		disabled?: boolean;
		onClick?: (event: MouseEvent) => void;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		children?: Snippet<[]>;
	}>();

	// **ÄNDRING:** Använd $derived istället för $:
	let buttonVariantClass = $derived(
		variant === 'primary' ? 'btn-primary' :
		variant === 'secondary' ? 'btn-secondary' :
		variant === 'link' ? 'btn-link' :
		'btn-primary' // Fallback
	);

</script>

<button
	{type}
	class="btn {buttonVariantClass} {extraClass ?? ''}"
	{disabled}
	onclick={onClick}
>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.btn {
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: var(--shb-border-radius);
		text-align: center;
		transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, color 0.15s ease-in-out, opacity 0.15s ease-in-out;
		cursor: pointer;
		font-family: var(--shb-font-sans);
        font-size: 1rem;
        line-height: 1.5;
        border: 1px solid transparent;
		white-space: nowrap;
	}
    .btn:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--shb-focus-ring-color);
    }
	.btn-primary {
		background-color: var(--shb-green-dark);
		color: white;
		border-color: var(--shb-green-dark);
	}
	.btn-primary:hover {
		opacity: 0.9;
	}
	.btn-primary:disabled {
		background-color: #a0aec0;
        border-color: #a0aec0;
		color: white;
	}
	.btn-secondary {
		background-color: white;
		color: var(--shb-green-dark);
		border-color: var(--shb-green-dark);
	}
	.btn-secondary:hover {
		background-color: var(--shb-green-light);
	}
	.btn-secondary:disabled {
		background-color: var(--shb-gray-light);
		color: #a0aec0;
        border-color: #e2e8f0;
	}
	.btn-link {
		background-color: transparent;
		color: var(--shb-green-dark);
		border-color: transparent;
        padding: 0;
        text-decoration: none;
	}
	.btn-link:hover {
		text-decoration: underline;
	}
    .btn-link:focus {
        text-decoration: underline;
    }
	.btn-link:disabled {
		color: #a0aec0;
        text-decoration: none;
	}
    .btn:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
</style>