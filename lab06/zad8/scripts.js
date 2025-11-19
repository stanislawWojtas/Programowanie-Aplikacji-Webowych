async function fetchCountries(){
	const url = 'https://restcountries.com/v3.1/all?fields=name,capital,population,area,alpha,currencies,languages,region,subregion,unMember'
	try{
		const response = await fetch(url);
		if(!response.ok){
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	}catch(error){
		console.error('Error fetching countries:', error);
		return [];
	}
}

// funkcje pomocnicze do formatowania danych
function getCapital(country){
	if(!country.capital) return 'N/A';
	return Array.isArray(country.capital) ? country.capital.join(', ') : country.capital;
}
function getCurrencies(c){
	if(!c.currencies) return 'N/A';
	return Object.values(c.currencies).map(cur => cur?.name).filter(Boolean).join(', ') || 'N/A';
}
function getLanguages(c){
	if(!c.languages) return 'N/A';
	return Object.values(c.languages).filter(Boolean).join(', ') || 'N/A';
}

function textOrNA(val){
	return (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) ? 'N/A' : String(val)
}

//główny element aplikacji
const state = {
	rows: [], //dane po normalizacji (formatowaniu)
	filtered: [], //dane po filtrowaniu przez użytkownika
	sortKey: null, // według której kolumny sortujemy
	sortOrder: 'asc', // 'asc' lub 'desc'
	page: 1, //aktualna strona
	pageSize: 10, //ilość elementów na stronę
	filters: {
		name: '',
        capital: '',
        currencies: '',
        languages: '',
        region: '',
        subregion: '',
        populationMin: null,
        populationMax: null,
        areaMin: null,
        areaMax: null,
        unMember: 'all' // all|yes|no
    }
};


function normalize(data) {
	return data.map(c => ({
		name: c.name?.common || 'N/A',
		capital: getCapital(c),
		population: Number(c.population) || 0,
		area: Number(c.area) || 0,
		currency: getCurrencies(c),
		language: getLanguages(c),
		region: textOrNA(c.region),
		subregion: textOrNA(c.subregion),
		unMember: Boolean(c.unMember)
	}))
}

function applyFilter(){
	const f = state.filters; //aktualne filtry
	const input = (s) => s.trim().toLowerCase(); //funkcja zwraca string sformatowany

	// filtrowanie dla każdegj kolumny
	state.filtered = state.rows.filter(c => {
		if(f.name && !c.name.toLowerCase().includes(input(f.name))) return false;
		if(f.capital && !c.capital.toLowerCase().includes(input(f.capital))) return false;
		if(f.currencies && !c.currency.toLowerCase().includes(input(f.currencies))) return false;
		if(f.languages && !c.language.toLowerCase().includes(input(f.languages))) return false;
		if(f.region && !c.region.toLowerCase().includes(input(f.region))) return false;
		if(f.subregion && !c.subregion.toLowerCase().includes(input(f.subregion))) return false;

		//number ranges
		if(f.populationMin != null && c.population < f.populationMin) return false;
		if(f.populationMax != null && c.population > f.populationMax) return false;
		if(f.areaMin != null && c.area < f.areaMin) return false;
		if(f.areaMax != null && c.area > f.areaMax) return false;

		//unMember
		if (f.unMember !== 'all') {
            const want = f.unMember === 'yes';
            // if (r.unMember !== want) return false;
            if (c.unMember !== want) return false;
        }

		//zwracamy true jeśli rekord przeszedł przez wszystkie filtry
		return true;
	})
}

function applySort(){
	if(!state.sortKey) return;
	const key = state.sortKey;
	const order = state.sortOrder === 'asc' ? 1 : -1;

	state.filtered.sort((a, b) => {
		const valA = a[key];
		const valB = b[key];
		if(typeof valA === 'number' && typeof valB === 'number') return (valA - valB) * order;
		if(typeof valA === 'boolean' && typeof valB === 'boolean') return (valA === valB ? 0 : valA ? 1 : -1) * order;
		return String(valA).localeCompare(String(valB)) * order;
	});
}

function paginate(arr){
    // const start = (start.page - 1) * start.pageSize;
    const startIndex = (state.page - 1) * state.pageSize;
    return arr.slice(startIndex, startIndex + state.pageSize);
}


function renderPagination(){
	const total = state.filtered.length;
	const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
	state.page = Math.min(state.page, totalPages);
	document.querySelector('#pageInfo').textContent = `Page ${state.page} / ${totalPages}`;
	document.querySelector('#prevBtn').disabled = state.page <= 1;
	document.querySelector('#nextBtn').disabled = state.page >= totalPages;
}

function renderSortingIndicators(){
	document.querySelectorAll('.sortable').forEach(th => {
		th.classList.remove('sort-asc', 'sort-desc');
		const key = th.dataset.key;
		if(key === state.sortKey){
			th.classList.add(state.sortOrder === 'asc' ? 'sort-asc' : 'sort-desc');
		}
	})
}

//główna funkcja aktualizująca widok tabeli
function renderTable(){
	const tbody = document.querySelector('tbody');
	tbody.innerHTML = '';
	const pageItems = paginate(state.filtered);
	for (const r of pageItems){
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${r.name}</td>
			<td>${r.capital}</td>
			<td class="numeric">${r.population.toLocaleString()}</td>
			<td class="numeric">${r.area.toLocaleString()}</td>
			<td>${r.currency}</td>
			<td>${r.language}</td>
			<td>${r.region}</td>
			<td>${r.subregion}</td>
			<td>${r.unMember ? 'Yes' : 'No'}</td>
		`;
		tbody.appendChild(tr);
	}
	renderPagination();
	renderSortingIndicators();
}

function updateAndRender(resetPage = false){
	applyFilter();
	applySort();
	if(resetPage) state.page = 1;
	renderTable();
}



//inicjalizacja aplikacji
function initEvents(){
	const filtersMap = [
		['nameFilter', 'name'],
        ['capitalFilter', 'capital'],
        ['currenciesFilter', 'currencies'],
        ['languagesFilter', 'languages'],
        ['regionFilter', 'region'],
        ['subregionFilter', 'subregion']
	];
	for (const [id, key] of filtersMap){
		const el = document.getElementById(id);
		el.addEventListener('input', () => {
			state.filters[key] = el.value;
			updateAndRender(true);
		})
	};

	const numMap = [
		['populationMinFilter', 'populationMin'],
		['populationMaxFilter', 'populationMax'],
		['areaMinFilter', 'areaMin'],
		['areaMaxFilter', 'areaMax']
	];
	for (const [id, key] of numMap){
		const el = document.getElementById(id);
		el.addEventListener('input', () => {
			const val = el.value.trim();
			state.filters[key] = val === '' ? null : Number(val);
			updateAndRender(true);
		})
	}


	const unSel = document.getElementById('unMemberFilter');
	unSel.addEventListener('change', () => {
		state.filters.unMember = unSel.value;
		updateAndRender(true);
	})

	const pageSize = document.getElementById('pageSize');
    state.pageSize = Number(pageSize.value);
    pageSize.addEventListener('change', () => {
        state.pageSize = Number(pageSize.value);
        updateAndRender(true);
    });

    document.querySelectorAll('.countriesTable thead th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const key = th.dataset.key;
            if (state.sortKey === key) {
                state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortKey = key;
                state.sortOrder = 'asc';
            }
            updateAndRender(false);
        });
    });

	document.getElementById('prevBtn').addEventListener('click', () => {
        if (state.page > 1) {
            state.page -= 1;
            renderTable();
        }
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(state.filtered.length / state.pageSize) || 1;
        if (state.page < totalPages) {
            state.page += 1;
            renderTable();
        }
    });
}

async function main(){
	const data = await fetchCountries();
	state.rows = normalize(data);
	applyFilter();
	initEvents();
	renderTable();
}

main();