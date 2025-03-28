<script lang="ts">
	import type { UserProfile } from '$lib/types';
	import Input from './Input.svelte';
	import Button from './Button.svelte';

	// Använd $state för formulärdata inom komponenten (Svelte 5)
	let profileData = $state<UserProfile>({
		age: null,
		currentIncomeNet: null,
		currentSavings: null, // Korrekt namn här
		currentDebt: null,    // Korrekt namn här
		civilStatus: null,
		numberOfChildren: 0
	});

	// Prop för att signalera när profilen är sparad
	let { onSubmitProfile = (profile: UserProfile) => {} } = $props<{
		onSubmitProfile?: (profile: UserProfile) => void;
	}>();

	// Hantera formulärinskickning
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault(); // Förhindra standardbeteende manuellt
		// Här skulle validering ske innan submit
		console.log("Submitting profile:", profileData);
		onSubmitProfile(profileData); // Anropa funktionen som skickades som prop
	}
</script>

<form onsubmit={handleSubmit} class="profile-form">
	<h2 class="form-title">Skapa din profil</h2>
	<div class="form-grid">
		<Input label="Nuvarande ålder" id="age" type="number" bind:value={profileData.age} required min="0" />
		<Input label="Nuvarande månadsinkomst (netto, kr)" id="income" type="number" bind:value={profileData.currentIncomeNet} required min="0" />
		
        <Input label="Nuvarande sparande/kapital (kr)" id="savings" type="number" bind:value={profileData.currentSavings} required min="0" /> 
		
        <Input label="Nuvarande skulder (totalt, kr)" id="debt" type="number" bind:value={profileData.currentDebt} required min="0" />   

		<div class="input-wrapper"> <label for="civilStatus" class="input-label">Civilstånd</label>
			<select id="civilStatus" bind:value={profileData.civilStatus} required >
				<option disabled selected value={null}>Välj...</option>
				<option value="single">Singel</option>
				<option value="married_registered_partner">Gift/Registrerad partner</option>
				<option value="cohabiting">Sambo</option>
			</select>
		</div>

		<Input label="Antal barn" id="children" type="number" bind:value={profileData.numberOfChildren} required min="0" />
	</div>

	<div class="form-actions">
		<Button type="submit" variant="primary">Spara profil</Button>
	</div>
</form>

<style>
    .profile-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
	.form-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: var(--shb-gray-dark);
	}
	.form-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 768px) {
        .form-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
	.form-actions {
		display: flex;
		justify-content: flex-end;
		padding-top: 1rem;
	}
    /* Stil för select och dess wrapper */
    select {
        width: 100%;
        /* Ärver grundstilar från app.css */
    }
    .input-wrapper { /* Behövs för marginal på select-div */
		margin-bottom: 1rem;
	}
	.input-label { /* Återanvänd från Input.svelte om global, annars behövs här */
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--shb-gray-medium);
		margin-bottom: 0.25rem;
	}
</style>