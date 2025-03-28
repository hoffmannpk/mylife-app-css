<script lang="ts">
	let {
		label,
		id,
		type = 'text',
		placeholder = '',
		value = $bindable(''), // Använd $bindable
		required = false,
		disabled = false,
		helperText = '',
		errorMessage = '',
		class: wrapperClass,
		...restProps
	} = $props<{
		label: string;
		id: string;
		type?: 'text' | 'number' | 'email' | 'password' | 'tel';
		placeholder?: string;
		value?: string | number | null;
		required?: boolean;
		disabled?: boolean;
		helperText?: string;
		errorMessage?: string;
		class?: string;
		[key: string]: any;
	}>();
</script>

<div class="input-wrapper {wrapperClass ?? ''}">
	<label for={id} class="input-label">
		{label}
		{#if required}<span class="input-required">*</span>{/if}
	</label>
	<input
		class="input-field {errorMessage ? 'input-error' : ''}"
		{id}
		{type}
		{placeholder}
		{required}
		{disabled}
		bind:value={value}
		{...restProps}
		aria-describedby={helperText || errorMessage ? `${id}-description` : undefined}
		aria-invalid={!!errorMessage}
	/>
	{#if errorMessage}
		<p id={`${id}-description`} class="input-message input-message-error">{errorMessage}</p>
	{:else if helperText}
		<p id={`${id}-description`} class="input-message">{helperText}</p>
	{/if}
</div>

<style>
	.input-wrapper {
		margin-bottom: 1rem;
	}
	.input-label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--shb-gray-medium);
		margin-bottom: 0.25rem;
	}
	.input-required {
		color: var(--shb-red);
	}
	.input-field {
        /* Använder globala stilar + nedan */
		width: 100%;
	}
	.input-error {
		border-color: var(--shb-red) !important; /* Viktig för att överskrida global */
	}
    .input-field.input-error:focus {
        box-shadow: 0 0 0 2px rgba(217, 55, 45, 0.5); /* Rödaktig focus-ring vid error */
    }
	.input-message {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--shb-gray-medium);
	}
    .input-message-error {
        color: var(--shb-red);
    }
</style>