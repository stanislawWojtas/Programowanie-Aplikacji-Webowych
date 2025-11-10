
document.addEventListener('DOMContentLoaded', () => {
	async function fetchUsers(){
		console.log("rozpoczęto pobieranie danych");
		const container = document.getElementById('users-container');
		try{
			const response = await fetch("user.json");
			
			if(!response.ok){
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const userData = await response.json();

			container.innerHTML = '';

			generateUserCards(userData, container);
		} catch (error) {
			console.error("Error fetching user data:", error);
			container.innerHTML = '<p style="color: red;">Failed to load user data.</p>';
		}
	}

	// Funkcja do generowania kart użytkowników
	function generateUserCards(users, container){
		console.log("rozpoczęto generowanie kart");
		users.forEach((user) => {
			const userHtml = `
				<section class="user-card">
					<h2>${user.firstName} ${user.lastName}</h2>
					<label class="toggle-label">
						<input type="checkbox" class="toggle">
						Pokaż/Ukryj dane teleadresowe
					</label>
					<div class="wrapper">
						<div class="user-details">
							<p><strong>Email: </strong>${user.email}</p>
							<p><strong>Telefon: </strong>${user.phone}</p>
							<p><strong>Adres: </strong>${user.Address.Street}, ${user.Address.City}, ${user.Address.Country}</p>
						</div>
					</div>
				</section>
				`;
			container.insertAdjacentHTML('beforeend', userHtml);
		})
	}
	fetchUsers();
});