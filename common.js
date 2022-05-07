function updatePage(key) {
    let new_tbody = document.createElement('tbody');

    let saved = localStorage.getItem(key);
    let parsed = JSON.parse(saved);
    let literature = JSON.parse(parsed.literature);
    for (l of literature) {
        let row = new_tbody.insertRow(-1);
        let k = -1;
        row.insertCell(++k).innerHTML = l.type;
        row.insertCell(++k).innerHTML = l.name;
        row.insertCell(++k).innerHTML = l.publication_date;
        row.insertCell(++k).innerHTML = l.quantity;
        row.insertCell(++k).innerHTML = l.ISBN;
        row.insertCell(++k).innerHTML = l.authours;
        let resource = "отсутствует";
        if (l.resource) {
            resource = l.resource;
        }
        row.insertCell(++k).innerHTML = resource;
    }
    let lbEmpty = document.getElementById("lbEmpty");
    if (literature.length == 0) {
        lbEmpty.innerHTML = "Пока нет ничего этого издателя в библиотеке.";
    } else {
        lbEmpty.innerHTML = "";
    }

    document.getElementById("lbUploadDate")
    .innerHTML = "Таблица была загружена " + parsed.date;

    let table = document.getElementsByTagName("table")[0];
    let old_tbody = table.firstChild;
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

function initAll(key, requestAttributes) {

    let savedValue = localStorage.getItem(key);
    let lbUploadDate = document.getElementById("lbUploadDate");
    let btnUpdate = document.getElementById("btnUpdate");
    if (!savedValue) {
        lbUploadDate.innerHTML = "Расписание не обнаружено в локальном хранилище.";
        btnUpdate.innerHTML = "Загрузить";
    } else {
        lbUploadDate.innerHTML = "Расписание было загружено";
        let date = "";
        try {
            let parsed = JSON.parse(savedValue);
            date = parsed.date;
            JSON.parse(parsed.literature);
        } catch(e) {
            lbUploadDate.append(", но не может быть обработано.");
            date = "";
        }
        lbUploadDate.append(date);
        if ("" != date) {
            updatePage(key);
        }
    }

    btnUpdate.key = key;
    btnUpdate.onclick = function () {
        let ajax = new XMLHttpRequest();
        ajax.open('GET', './library.php?' + requestAttributes);
        ajax.key = this.key;
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                if (!(localStorage.getItem(this.key) === undefined)) {
                    btnUpdate.innerHTML = "Обновить";
                }

                let uploadDate = new Date().toLocaleString();
                localStorage.setItem(
                    this.key, JSON.stringify(
                        {
                            date: uploadDate,
                            literature: ajax.responseText
                        })
                );
                updatePage(this.key);
            }
        };
        ajax.send(null);
    };

}