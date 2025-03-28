<script lang="ts">
	let { title = 'Diagram' } = $props<{ title?: string }>();
</script>

<div class="chart-placeholder">
	<p class="placeholder-text">{title} - Kommer snart...</p>
</div>

<style>
    .chart-placeholder {
        width: 100%;
        min-height: 16rem; /* ca h-64 */
        background-color: var(--shb-gray-light);
        border: 1px dashed var(--shb-border);
        border-radius: var(--shb-border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .placeholder-text {
        color: var(--shb-gray-medium);
    }
</style>