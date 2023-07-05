import "../../css/root/index.css";


var copyButtons = document.getElementsByClassName('copy-button');
for (var i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener('click', function (event) {
        var code = event.target.getAttribute('data-code');
        copyToClipboard(code);
    });
}

function copyToClipboard(text) {
    var tempInput = document.createElement('input');
    tempInput.setAttribute('value', text);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function filterTable() {
    const selectedValue = document.getElementById("filterItem").value;
    const tableBody = document.getElementById("tableBody");
    const rows = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const item = row.getAttribute("data-item");

        if (selectedValue === "" || selectedValue === item) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
};

let select = document.getElementById("filterItem");
select.addEventListener("change", filterTable);

function searchTable() {
    let input = document.getElementById("searchInput");
    let filter = input.value.toUpperCase();
    let table = document.querySelector(".container");
    let rows = table.querySelectorAll("tbody tr");

    for (let i = 0; i < rows.length; i++) {
        let name = rows[i].querySelector("td:nth-of-type(2)");
        let item = rows[i].getAttribute("data-item");
        if (name) {
            let txtValue = name.textContent || name.innerText;
            if (
                (filter === "" || txtValue.toUpperCase().indexOf(filter) > -1) &&
                (document.getElementById("filterItem").value === "" ||
                    document.getElementById("filterItem").value === item)
            ) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

let input = document.getElementById("searchInput");
input.addEventListener("keyup", searchTable);

const favbutton = document.querySelector('.favFil');
const favoriteButton = document.querySelector(".favFil.star-button");

// ボタンのクリックイベントを監視
favoriteButton.addEventListener('click', function () {
    const tableBody = document.getElementById("tableBody");
    const rows = tableBody.getElementsByTagName("tr");

    // お気に入りのみ表示するかどうかを判断するフラグ
    let showFavoritesOnly = true;

    // お気に入り切り替えボタンの状態に応じてフラグを切り替える
    if (favoriteButton.classList.contains("active")) {
        favoriteButton.classList.remove("active");
        showFavoritesOnly = false;
    } else {
        favoriteButton.classList.add("active");
    }

    // 各行をループして表示を切り替える
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const isFavorite = row.querySelector(".star-button").classList.contains("favorite");

        if (showFavoritesOnly) {
            // お気に入りのみ表示する場合、お気に入りでない行は非表示にする
            if (!isFavorite) {
                row.style.display = "none";
            } else {
                row.style.display = "";
            }
        } else {
            // すべての行を表示する場合
            row.style.display = "";
        }
    }

    const starIcon = document.querySelector('.star-icon');

    // favoriteクラスの追加/削除
    starIcon.classList.toggle('favoriteB');
});



