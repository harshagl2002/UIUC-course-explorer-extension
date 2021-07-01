function getCourseInfo(searchText) {
    const regexNumbers = /[0-9]+/
    const name = searchText.split(regexNumbers)[0].toUpperCase().trim();
    const possibleNumbers = searchText.match(regexNumbers);
    let number = null;
    if (possibleNumbers !== null) {
        number = possibleNumbers[0].trim();
    }
    return [name, number];
}

function getTermInfo(searchText) {
    const regexNumbers = /[0-9]+/
    const term = searchText.split(regexNumbers)[0].toLowerCase().trim().toString();
    const possibleYears = searchText.match(regexNumbers);
    let year = null;
    if (possibleYears !== null) {
        year = possibleYears[0].trim().toString();
    }
    return [term, year];
}

function getCourseTermInfo(searchText) {
    const regexNumbers = /[0-9]+/
    const term = searchText.split(regexNumbers)[0].toLowerCase().trim().toString();
    const course = searchText.split(regexNumbers)[1].toUpperCase().trim().toString();
    const possibleYears = searchText.match(regexNumbers);
    let year = null;
    if (possibleYears !== null) {
        year = possibleYears[0].trim().toString();
    }
    return [term, year, course];
}

function getCourseTermNumInfo(searchText) {
    /*const term = arr[0];
    const year = arr[1];
    const course = arr[2];
    const number = arr[3];*/
    const regexNumbers = /[0-9]+/
    const term = searchText.split(regexNumbers)[0].toLowerCase().trim().toString();
    const course = searchText.split(regexNumbers)[1].toUpperCase().trim().toString();
    const possibleYears = searchText.match(regexNumbers);
    let year = null;
    if (possibleYears !== null) {
        year = possibleYears[0].trim().toString();
    }
    searchText = searchText.toString();
    const arr = searchText.split(" ");
    return [term, year, course, arr[3]];
}

function addLocations(rows) {
    if (rows.length === 0) {
        return;
    }

    const rowArr = Array.from(rows);
    const infoRows = rowArr.filter(row => row.id.startsWith("uid"));
    infoRows.forEach((infoRow) => {
        const locationElement = infoRow.getElementsByClassName("app-meeting")[4];
        const locationText = locationElement.textContent;
        const mapsLink = encodeURI(`https://www.google.com/maps/search/${locationText}+UIUC+USA`);
        locationElement.innerHTML = `<a href="${mapsLink}" target="_blank">${locationText}</a>`;
    });
}
const rows = document.getElementsByTagName("tr");
addLocations(rows);

const searchForm = document.getElementById("subjectAutoJump-form");
searchForm.addEventListener("submit", (event) => {
    console.log("Got a submit henlo");
    const searchBox = document.getElementById("subjectAutoJump");
    const searchText = searchBox.value;
    console.log(searchText);

    const [name, number] = getCourseInfo(searchText);
    console.log(`${name}-${number}`);
    if (number == null) {
        return;
    }

    const newURL = `https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/${name}/${number}`;
    window.location.href = newURL;
    event.preventDefault();
});


const searchEngine = document.getElementById("subjectAutoJump-form");
searchEngine.addEventListener("submit", (event) => {
    console.log("Got a submit henlo");
    const searchBox = document.getElementById("subjectAutoJump");
    const searchText = searchBox.value;
    console.log(searchText);

    const [term, year] = getTermInfo(searchText);
    console.log(`${term}-${year}`);
    var d = new Date();
    var currentYear = d.getFullYear().toString();
    if (year.localeCompare("2004") < 0 || year.localeCompare(currentYear) > 0) {
        return;
    }
    const newLoc = `https://courses.illinois.edu/schedule/${year}/${term}`;
    window.location.href = newLoc;
    event.preventDefault();
});

const searchBar = document.getElementById("subjectAutoJump-form");
searchBar.addEventListener("submit", (event) => {
    const searchBox = document.getElementById("subjectAutoJump");
    const searchText = searchBox.value;
    const [term, year, course] = getCourseTermInfo(searchText);

    var d = new Date();
    var currentYear = d.getFullYear().toString();

    if (year.localeCompare("2004") < 0 || year.localeCompare(currentYear) > 0) {
        return;
    }
    const newURL = `https://courses.illinois.edu/schedule/${year}/${term}/${course}`;
        window.location.href = newURL;
    event.preventDefault();
});

const searchMenu = document.getElementById("subjectAutoJump-form");
searchMenu.addEventListener("submit", (event) => {
    const searchBox = document.getElementById("subjectAutoJump");
    const searchText = searchBox.value;
    const [term, year, course, number] = getCourseTermNumInfo(searchText);

    var d = new Date();
    var currentYear = d.getFullYear().toString();

    if (year.localeCompare("2004") < 0 || year.localeCompare(currentYear) > 0) {
        return;
    }
    const newURL = `https://courses.illinois.edu/schedule/${year}/${term}/${course}/${number}`;
    window.location.href = newURL;
    event.preventDefault();
});


