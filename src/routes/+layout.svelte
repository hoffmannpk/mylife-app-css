<script lang="ts">
	import '../app.css'; // Importera globala stilar
</script>

<div class="min-h-screen">
	<slot />
</div>

<style>
	.min-h-screen {
		min-height: 100vh;
	}
</style>