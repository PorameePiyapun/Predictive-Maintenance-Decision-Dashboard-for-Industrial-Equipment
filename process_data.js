const fs = require('fs');
const data = JSON.parse(fs.readFileSync('machine-failure-prediction-completed.json', 'utf8'));
const countsByDate = {};
data.forEach(row => {
    const date = row.Timestamp ? row.Timestamp.split(' ')[0] : 'Unknown';
    if (!countsByDate[date]) {
        countsByDate[date] = { TWF: 0, HDF: 0, PWF: 0, OSF: 0, RNF: 0 };
    }
    if (row.TWF == 1) countsByDate[date].TWF++;
    if (row.HDF == 1) countsByDate[date].HDF++;
    if (row.PWF == 1) countsByDate[date].PWF++;
    if (row.OSF == 1) countsByDate[date].OSF++;
    if (row.RNF == 1) countsByDate[date].RNF++;
});
const labels = Object.keys(countsByDate).sort().filter(l => l !== 'Unknown');
const result = {
    labels: labels,
    datasets: [
        { label: 'TWF', data: labels.map(l => countsByDate[l].TWF) },
        { label: 'HDF', data: labels.map(l => countsByDate[l].HDF) },
        { label: 'PWF', data: labels.map(l => countsByDate[l].PWF) },
        { label: 'OSF', data: labels.map(l => countsByDate[l].OSF) },
        { label: 'RNF', data: labels.map(l => countsByDate[l].RNF) }
    ]
};
console.log(JSON.stringify(result));
