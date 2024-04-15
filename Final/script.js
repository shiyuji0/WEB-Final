document.getElementById('fetchData').addEventListener('click', fetchData);
document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);

function fetchData() {
    const year = document.getElementById('year').value;
    const url = `https://ergast.com/api/f1/${year}/drivers.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayData(data, year); // Pass the year to the displayData function
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayData(data, year) { // Add year parameter
    const series = data.MRData.series;
    const totalResults = data.MRData.total;

    const drivers = data.MRData.DriverTable.Drivers;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Series: ${series}</h2>
        <h2>Season: ${year}</h2> <!-- Display the entered year as the season -->
        <h2>Total Number of Results: ${totalResults}</h2>
        <table>
            <thead>
                <tr>
                    <th>Driver Name</th>
                    <th>Permanent Number</th>
                    <th>Nationality</th>
                    <th>Date of Birth</th>
                    <th>Additional Information</th>
                </tr>
            </thead>
            <tbody>
                ${drivers.map(driver => `
                    <tr>
                        <td>${driver.givenName} ${driver.familyName}</td>
                        <td>${driver.permanentNumber}</td>
                        <td>${driver.nationality}</td>
                        <td>${driver.dateOfBirth}</td>
                        <td><a href="${driver.url}" target="_blank">Bio</a></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}