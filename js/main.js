let popupFilterBtns = document.querySelectorAll(".popup-filter-btn");
let dropdownBtns = document.querySelectorAll(".dropdown-wrap .dropdown-head");
let filterDropdowns = document.querySelectorAll(".filter-dropdown");
let popups = document.querySelectorAll(".popup");

window.addEventListener("click", e => {
    const target = e.target
    if (target.classList.contains("popup-wrap") || target.parentNode.classList.contains("popup-wrap")) {
        let body = document.querySelector("body").classList;
        let filterPopup = document.querySelector(".filter-popup");

        if (filterPopup) { filterPopup.classList.remove('show'); }

        body.remove("stop-scroll");
    }
})

window.addEventListener("resize", () => {
    let body = document.querySelector("body").classList;
    body.remove("stop-scroll");

    if (popups) {
        popups.forEach(element => {
            element.classList.remove("show");
        });
    }

    if (dropdownBtns) {
        dropdownBtns.forEach(element => {
            element.parentNode.querySelector(".dropdown").classList.remove("dropdown-opened");
        });
    }
});

document.addEventListener("click", function (event) {
    let dropdownList = document.querySelectorAll(".dropdown");
    dropdownList.forEach(element => {
        if (!element.contains(event.target) && !(event.target.classList.contains("dropdown-head"))) {
            element.classList.remove('dropdown-opened');
        }
    });
});

if (popupFilterBtns) {
    popupFilterBtns.forEach(element => {
        element.addEventListener("click", () => {
            let popup = document.querySelector(".filter-popup").classList;

            popup.toggle("show");

            let body = document.querySelector("body").classList;
            body.toggle("stop-scroll");
        });
    });
}

if (dropdownBtns) {
    dropdownBtns.forEach(element => {
        element.addEventListener("click", () => {
            dropdownBtns.forEach(e => {
                let allDropdown = e.parentNode.querySelector(".dropdown").classList;
                if (e !== element) {
                    allDropdown.remove("dropdown-opened");
                }
            });
            let dropdown = element.parentNode.querySelector(".dropdown").classList;
            dropdown.toggle("dropdown-opened");
        });
    });
}

if (filterDropdowns) {
    filterDropdowns.forEach(element => {
        let parameters = element.querySelectorAll(".item__list ul li");

        parameters.forEach(parameter => {
            parameter.addEventListener("click", () => {
                element.querySelector(".dropdown-head").innerHTML = parameter.textContent;

                let value = parameter.getAttribute("data-value");
                let selectOptions = element.querySelectorAll("select option");

                selectOptions.forEach(option => {
                    if (option.getAttribute("value") == value) {
                        option.setAttribute("selected", "");

                        element.querySelector(".dropdown").classList.remove("dropdown-opened");
                    }
                });
            });
        });
    });
}

function addSpacesToNumber() {
    let numbers = document.querySelectorAll(".filter__number");

    numbers.forEach(element => {
        let value = parseInt(element.value.replace(/\D/g, ""), 10);
        let min = parseInt(element.getAttribute("data-min"), 10);
        let max = parseInt(element.getAttribute("data-max"), 10);

        if (isNaN(value)) {
            value = element.classList.contains("num1") ? min : max;
            console.log(value);
        } else {
            if (element.classList.contains("num1")) {
                let num2Value = parseInt(element.parentNode.parentNode.querySelector(".num2").value.replace(/\D/g, ""), 10);
                if (value < min) value = min;
                if (value > num2Value) value = num2Value;
            } else if (element.classList.contains("num2")) {
                let num1Value = parseInt(element.parentNode.parentNode.querySelector(".num1").value.replace(/\D/g, ""), 10);
                if (value > max) value = max;
                if (value < num1Value) value = num1Value;
            }
        }

        element.value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });
}