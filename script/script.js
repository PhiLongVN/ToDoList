/* ============================================ */
/*                    TOGGLE                    */
/* ============================================ */

const togglee = document.querySelector(".toggle");

togglee.onclick = () => {
  document.body.classList.toggle("active");
};

/* ============================================ */
/*                     ADD                     */
/* ============================================ */

const btAdd = document.querySelector(".bt-add");
const input = document.querySelector(".input-text");
const output = document.querySelector(".output-list");

btAdd.addEventListener("click", addItem);

function addItem() {
  let item = document.createElement("li");
  item.className = "item";

  // add check
  let check = document.createElement("div");
  check.className = "check";
  let checkImg = document.createElement("img");
  checkImg.className = "checkimg";
  checkImg.setAttribute("src", "./images/icon-check.svg");
  check.appendChild(checkImg);
  item.appendChild(check);

  // add text vao
  let valueItem = input.value;
  let text = document.createElement("span");
  text.classList = "text";
  text.innerText = valueItem;
  item.appendChild(text);

  // add close
  let close = document.createElement("img");
  close.setAttribute("src", "./images/icon-cross.svg");
  close.className = "close";
  item.appendChild(close);

  // check
  if (valueItem === "") {
    alert("please fill your goal");
  } else {
    output.appendChild(item);
    saveLocal(valueItem);
    input.value = "";
  }

  checkleft();
}

/* ============================================ */
/*              BAM CHECK VA DELETE             */
/* ============================================ */

output.onclick = (e) => {
  if (e.target.className === "check" || e.target.className === "text") {
    e.target.parentNode.classList.toggle("checked");
    checkleft();
  } else if (e.target.className === "close") {
    let ii = e.target.parentNode;
    ii.classList.add("delete");
    ii.addEventListener("transitionend", () => {
      setTimeout(() => {
        ii.remove();
        checkleft();
      }, 700);
    });
    deleteLocal(ii);
  }
};

/* ============================================ */
/*                   CHECKLEFT                  */
/* ============================================ */

function checkleft() {
  const checkleft = document.querySelector(".op-left");
  const items = document.querySelectorAll(".item");
  console.log("checkleft -> items", items);
  let count = 0;

  items.forEach((item) => {
    if (!item.classList.contains("checked")) {
      count++;
      // console.log("checkleft -> count", count)
      checkleft.innerText = `${count} items left`;
    }
    if (count == 0) {
      checkleft.innerText = `0 items left`;
    }
  });

  if (items.length === 0) {
    checkleft.innerText = `0 items left`;
  }
}

/* ============================================ */
/*                    OPTION                    */
/* ============================================ */
/* --------------------- C -------------------- */
const choose = document.querySelector(".op-choose");

choose.addEventListener("click", handleOption);

function handleOption(e) {
  const items = document.querySelectorAll(".item");
  const all = document.querySelector(".all");
  const completed = document.querySelector(".completed");
  const active = document.querySelector(".active");

  items.forEach((item) => {
    switch (e.target.classList[0]) {
      // all
      case "all":
        item.style.display = "flex";
        completed.classList.remove("actived");
        active.classList.remove("actived");
        all.classList.add("actived");
        break;

      // completed
      case "completed":
        if (item.classList.contains("checked")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        all.classList.remove("actived");
        active.classList.remove("actived");
        completed.classList.add("actived");
        break;

      // active
      case "active":
        if (!item.classList.contains("checked")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        completed.classList.remove("actived");
        all.classList.remove("actived");
        active.classList.add("actived");
        break;
    }
  });
}

/* ============================================ */
/*                     CLEAR                    */
/* ============================================ */
const clear = document.querySelector(".op-clear");

clear.onclick = () => {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    if (item.classList.contains("checked")) {
      setTimeout(() => {
        item.classList.add("delete");
        item.addEventListener("transitionend", () => {
          item.remove();
        });
        deleteLocal(item);
      }, 200);
    }
  });
};

/* ============================================ */
/*                 LOCAL STORAGE                */
/* ============================================ */

// save
function saveLocal(item) {
  let list;
  if (localStorage.getItem("list") === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem("list"));
  }

  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
}

document.addEventListener("DOMContentLoaded", getLocal);

// get
function getLocal() {
  let list;
  if (localStorage.getItem("list") === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem("list"));
  }

  list.forEach((items) => {
    let item = document.createElement("li");
    item.className = "item";

    // add check
    let check = document.createElement("div");
    check.className = "check";
    let checkImg = document.createElement("img");
    checkImg.className = "checkimg";
    checkImg.setAttribute("src", "./images/icon-check.svg");
    check.appendChild(checkImg);
    item.appendChild(check);

    // add text vao
    let valueItem = items;
    let text = document.createElement("span");
    text.classList = "text";
    text.innerText = valueItem;
    item.appendChild(text);

    // add close
    let close = document.createElement("img");
    close.setAttribute("src", "./images/icon-cross.svg");
    close.className = "close";
    item.appendChild(close);

    output.appendChild(item);
    checkleft();
  });
}

// delete
function deleteLocal(item) {
  let list;
  if (localStorage.getItem("list") === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem("list"));
  }

  let value = item.children[1].innerText;
  let index = list.indexOf(value);
  list.splice(index, 1);

  localStorage.setItem("list", JSON.stringify(list));
}
