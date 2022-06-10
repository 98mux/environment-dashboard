<script>
	export let title = '';
	export let measurementValue = '';
	export let component = '';
    let icon = 'fa-smile text-success';

    // Forurensningsklasser fra miljødir https://luftkvalitet.miljodirektoratet.no/artikkel/artikler/helserad_og_forurensningsklasser/
    const qualityLevel = {
        'NO2': {
            'good': {
                'min': 0,
                'max': 100
            },
            'moderate': {
                'min': 100,
                'max': 200
            },
            'bad': {
                'min': 200,
                'max': 400
            },
            'veryBad': {
                'min': 400,
                'max': 1000
            }
        },
        'PM25': {
            'good': {
                'min': 0,
                'max': 30
            },
            'moderate': {
                'min': 30,
                'max': 50
            },
            'bad': {
                'min': 50,
                'max': 150
            },
            'veryBad': {
                'min': 150,
                'max': 1000
            }
        },
        'PM10': {
            'good': {
                'min': 0,
                'max': 60
            },
            'moderate': {
                'min': 60,
                'max': 120
            },
            'bad': {
                'min': 120,
                'max': 400
            },
            'veryBad': {
                'min': 400,
                'max': 1000
            }
        },
    }

    const iconLevel = {
        'good': 'fa-smile text-success',
        'moderate': 'fa-face-meh text-warning',
        'bad': 'fa-face-frown text-error',
        'veryBad': 'fa-skull-crossbones text-error',
    }

    for (const [key, value] of Object.entries(qualityLevel[component])) {
        if (measurementValue >= value.min && measurementValue < value.max) {
            icon = iconLevel[key];
            break
        }
    }
</script>

<div class="stats shadow w-full h-full">
	<div class="stat text-center my-2 gap-2">
		<div class="stat-title">{title}</div>
		<div class="stat-value">{measurementValue}</div>
		<i class="fa-solid text-7xl mx-auto {icon}" />
	</div>
</div>
