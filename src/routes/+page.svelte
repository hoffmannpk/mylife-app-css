<script lang="ts">
	// Script-delen är densamma som den senaste versionen (med $state/$derived etc.)
	import { type UserProfile, type LifeEvent, EventType } from '$lib/types';
	import { formatNumber, formatPercentage } from '$lib/utils/formatting';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import ChartPlaceholder from '$lib/components/ChartPlaceholder.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import EventItem from '$lib/components/EventItem.svelte';
	import MetricDisplay from '$lib/components/MetricDisplay.svelte';
	import Input from '$lib/components/Input.svelte';

	let userProfile = $state<UserProfile | null>(null);
	let lifeEvents = $state<LifeEvent[]>([]);
	let showProfileForm = $derived(!userProfile);
	let savingRate = $state(0.1);

	let totalSavings = $derived(userProfile?.currentSavings ?? 0);
	let netWorth = $derived((userProfile?.currentSavings ?? 0) - (userProfile?.currentDebt ?? 0));
    let yearlySavings = $derived((userProfile?.currentIncomeNet ?? 0) * savingRate * 12);

	function handleProfileSubmit(profile: UserProfile) {
		userProfile = profile;
		console.log('Profile updated on page:', userProfile);
	}

	function addLifeEvent() {
		const newEvent: LifeEvent = {
			id: Date.now().toString(),
			type: EventType.HaveChild,
			age: (userProfile?.age ?? 0) + 5,
			annualCostIncrease: 50000,
			notes: 'Exempel: Fick barn'
		};
		lifeEvents = [...lifeEvents, newEvent].sort((a, b) => a.age - b.age);
		console.log('Added event:', newEvent);
	}

    function simulateChangeEffect() {
        console.log("Simulerar effekten av en ändring...");
    }

    function handleSavingRateInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const value = parseFloat(target.value);
        if (!isNaN(value)) {
            savingRate = value / 100;
        }
    }
</script>

<main class="container page-container">
	<h1 class="page-title">MyLife - Din Ekonomiska Översikt</h1>

    {#if showProfileForm}
      <Card title="Starta här: Ange din profil" class="profile-form-card">
        <ProfileForm onSubmitProfile={handleProfileSubmit} />
      </Card>
    {/if}

	{#if userProfile}
		<div class="dashboard-layout">
			<div class="diagram-column">
				<Card title="Inkomster och Utgifter">
					<ChartPlaceholder title="Inkomst/Utgift-diagram" />
				</Card>
				<Card title="Tillgångar och Skulder">
					<ChartPlaceholder title="Tillgång/Skuld-diagram" />
				</Card>
			</div>

			<div class="sidebar-column">
                <Card title="Grundinställningar">
                     <Input
                        label="Årlig sparandel (%)"
                        id="savingRate"
                        type="number"
                        value={savingRate * 100}
                        oninput={handleSavingRateInput}
                        step="1"
                     />
                     <p class="help-text">Justera grundantaganden här.</p>
                     <Button variant="secondary" onClick={simulateChangeEffect} class="recalculate-button">Beräkna om</Button>
                </Card>

				<Card title="Livshändelser">
                    <div class="event-list-container">
                        {#each lifeEvents as event (event.id)}
                            <EventItem {event} />
                        {:else}
                            <p class="empty-list-message">Inga händelser tillagda.</p>
                        {/each}
                    </div>
					<Button variant="primary" onClick={addLifeEvent} class="add-event-button">
						+ Lägg till Händelse
					</Button>
				</Card>

                <Card title="Nyckeltal (Exempel)">
                    <div class="metric-grid">
                        <MetricDisplay label="Totalt Sparande" value={totalSavings} />
                        <MetricDisplay label="Nettovärde" value={netWorth} showChange={true} changeValue={-15000} />
                        <MetricDisplay label="Sparande per år" value={yearlySavings} />
                        <MetricDisplay label="Sparkvot" value={savingRate} unit="%" />
                    </div>
                    <p class="help-text">Nyckeltal uppdateras baserat på din profil och händelser.</p>
                </Card>
			</div>
		</div>
	{:else if !showProfileForm}
        <p class="loading-message">Laddar din översikt...</p>
    {/if}

</main>

<style>
    .page-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .page-title {
        font-size: 1.875rem;
        line-height: 2.25rem;
        font-weight: 700;
        color: var(--shb-green-dark);
        margin-bottom: 1.5rem;
    }
    :global(.profile-form-card) { /* Lägg till :global() */
    margin-bottom: 1.5rem;
    }
    .dashboard-layout {
        display: grid;
        gap: 1.5rem;
    }
    .diagram-column {
        display: grid;
        gap: 1.5rem;
    }
    .sidebar-column {
        display: grid;
        gap: 1.5rem;
        align-content: start;
    }
    @media (min-width: 1024px) {
        .dashboard-layout {
             grid-template-columns: 2fr 1fr;
        }
    }
    .help-text {
        font-size: 0.75rem;
        color: var(--shb-gray-medium);
        margin-top: 0.5rem;
    }
    :global(.recalculate-button) { /* Lägg till :global() */
    margin-top: 0.5rem;
    }
     .event-list-container {
        max-height: 15rem;
        overflow-y: auto;
        margin-bottom: 1rem;
        /* Border och divide hanteras nu i EventItem.svelte */
     }
     .empty-list-message {
        padding: 1rem;
        text-align: center;
        color: var(--shb-gray-medium);
     }
     :global(.add-event-button) { /* Lägg till :global() */
    width: 100%;
    }
     .metric-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.5rem;
     }
     .loading-message {
        text-align: center;
        color: var(--shb-gray-medium);
     }
</style>