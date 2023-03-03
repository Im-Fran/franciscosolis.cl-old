@php
	$meta = collect($page['props']['meta'] ?? []);

	collect([
        'og:title' => 'FranciscoSolis',
        'og:description' => 'Quality & Free apps for everyone!',
        'og:url' => url()->current(),
        'og:image' => asset('images/Logo.svg'),
    ])->filter(fn($value, $key) => $meta->where('name', '=', $key)->count() == 0)->each(fn($value, $key) => print("<meta name=\"$key\" content=\"$value\"/>"));

	$meta->each(fn($item) => print(isset($item['name']) && $item['name'] === 'og:title' ? "<meta name='og:title' content='{$item['content']} | FranciscoSolis' />" : "<meta " . implode(" ", array_map(fn($key, $value) => "$key='$value'", array_keys($item), $item)) . " />"));
@endphp

<script>
    window.csrf_token = '{{ csrf_token() }}';
</script>