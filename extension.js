function getCourseInfo(searchText) {
    const regexNumbers = /[0-9]+/
    const name = searchText.split(regexNumbers)[0].toUpperCase().trim().toString();
    const possibleNumbers = searchText.match(regexNumbers);
    let number = null;
    if (possibleNumbers !== null) {
        number = possibleNumbers[0].trim().toString();
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


const searchEngine = document.getElementById("subjectAutoJump-form");
searchEngine.addEventListener("submit", (event) => {
    const searchBox = document.getElementById("subjectAutoJump");
    const searchText = searchBox.value.toString();
    const searchTextArr = searchText.split(" ");
    if (searchTextArr.length == 2) {
        const [name, number] = getCourseInfo(searchText);
        if (name.localeCompare("FALL") == 0 || name.localeCompare("SPRING") == 0 || name.localeCompare("SUMMER") == 0) {
            var d = new Date();
            var currentYear = d.getFullYear().toString();
            const [term, year] = getTermInfo(searchText);

           if (year.localeCompare("2004") < 0 || year.localeCompare(currentYear) > 0) {
                return;
            } else {

                const newLoc = `https://courses.illinois.edu/schedule/${year}/${term}`;
                window.location.href = newLoc;
                event.preventDefault();
            }
        } else {
            const newURL = `https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/${name}/${number}`;
            window.location.href = newURL;
            event.preventDefault();
        }
    } else if (searchTextArr.length == 3) {
            const [term, year, course] = getCourseTermInfo(searchText);

        var date2 = new Date();
        var currentYear3 = date2.getFullYear().toString();

        if (year.localeCompare("2004") < 0 || year.localeCompare(currentYear3) > 0) {
            return;
        }
        const newURL = `https://courses.illinois.edu/schedule/${year}/${term}/${course}`;
        window.location.href = newURL;
        event.preventDefault();
    } else if (searchTextArr.length == 4) {
        const [term, year, course, number] = getCourseTermNumInfo(searchText);

        var date = new Date();
        var currentYear2 = date.getFullYear().toString();

        if (year.localeCompare("2004") < 0 || year.localeCompare(currentYear2) > 0) {
            return;
        }
        const newURL = `https://courses.illinois.edu/schedule/${year}/${term}/${course}/${number}`;
        window.location.href = newURL;
        event.preventDefault();
    }
});





