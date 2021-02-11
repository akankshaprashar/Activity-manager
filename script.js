let aArray = [];
let arr;
setLocalStorage();
$("#button").click(function () {
  let name = $("#name").val();
  let date = $("#date").val();
  let select = $("#select").val();
  let myselect = $("#myselect").val();

  let u = { name: name, date: date, select: select, myselect: myselect };
  if (validation()) {
    aArray.push(u);
    setLocalStorage("value");
  } else {
    console.log("eeeeeeeeeee");
  }
});

//Localstorage
function setLocalStorage(value) {
  if (!value) {
    arr = JSON.parse(localStorage.getItem("user"));
    if (arr && arr.length) {
      aArray = arr;
      insertRecord();
    } else {
      if (aArray && aArray.length) {
        localStorage.setItem("user", JSON.stringify(aArray));
      }
    }
  } else {
    if (aArray && aArray.length) {
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(aArray));
      insertRecord();
    }
  }
}

function insertRecord() {
  $("tbody").empty();
  var currentDate = new Date().toISOString().split("T")[0];
  let tr = "";
  for (let i = 0; i < aArray.length; i++) {
    if (aArray[i].date === currentDate) {
      tr = `<tr>
      <td>${aArray[i].name}</td>
      <td>${aArray[i].date}</td>
      <td>${aArray[i].select}</td>
      <td>${aArray[i].myselect}</td>
      <td><button id="btn1" value="${i}" onclick ="onDelete(${i})">Delete</button</td>
      
      </tr>`;
      $("tbody").append(tr);
    }
  }
}

//edit
$("#btn").css("display", "none");
function onEdit(dd) {
  $("#name").val(aArray[dd].name);
  $("#date").val(aArray[dd].date);
  $("#select").val(aArray[dd].select);
  $("#myselect").val(aArray[dd].myselect);
  $("#btn").css("display", "inline");
  $("#button").css("display", "none");
  $("#btn").val(dd);
}

///update
function onupdate() {
  dd = $("#btn").val();
  let uname = $("#name").val();
  let udate = $("#date").val();
  let uselect = $("#select").val();
  let umyselect = $("#myselect").val();
  aArray.splice(dd, 1, {
    name: uname,
    date: udate,
    select: uselect,
    myselect: umyselect,
  });
  $("#btn").css("display", "inline");
  $("#button").css("display", "none");
  setLocalStorage("update");
}

///delete
function onDelete(dd) {
  aArray.splice(dd, 1);
  $("tbody").empty();
  setLocalStorage("akanksha");
  localStorage.setItem("user", JSON.stringify(aArray));
}

//validation
function validation() {
  let name = $("#name").val();
  if (name == "") {
    $("#username").text("*enter username*");
    return false;
  }
  if (!isNaN(name)) {
    $("#username").text("*enter the character*");
    return false;
  }
  if (name.length <= 1 || name.length > 20) {
    $("#username").text("*write 2 to 20 character*");
    return false;
  }
  $("#username").css("display", "none");
  return true;
}

//sorting
$("#sort").click(function () {
  arr.sort(function (item1, item2) {
    let name1 = item1.name.toUpperCase();
    let name2 = item2.name.toUpperCase();
    if (name1 < name2) {
      return -1;
    } else if (name1 > name2) {
      return 1;
    }
  });
  setLocalStorage("sort");
});

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbl");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
