let add = document.getElementById("add");
      add.addEventListener("click", addtask);
      localStorage.clear();
      function addtask() {
        console.log("Updating List");
        task = document.getElementById("task").value;
        desc = document.getElementById("description").value;
        if (task == "") {
          alert("Please fill in all the fields");
          console.log("Empty field");
        } else {
          if (localStorage.getItem("itemsJson") == null) {
            itemJsonArray = [];
            itemJsonArray.push([task, desc]);
            localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
          } else {
            itemJsonArrayStr = localStorage.getItem("itemsJson");
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([task, desc]);
            localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
          }
          let tbody = document.getElementById("tbody");
          let str = "";

          itemJsonArray.forEach((element, index) => {
            str += `<tr>
              <th scope="row">${index + 1}</th>
              <td>${element[0]}</td>
              <td>${element[1]}</td>
              <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete Task</button></td>
            </tr>`;
          });
          tbody.innerHTML = str;
          document.getElementById("task").value = "";
          document.getElementById("description").value = "";
        }
      }
      function deleted(taskIndex) {
        console.log("Deleted");
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.splice(taskIndex, 1);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
        update();
      }
      function update() {
        if (localStorage.getItem("itemsJson") == null) {
          itemJsonArray = [];
          localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
        } else {
          itemJsonArrayStr = localStorage.getItem("itemsJson");
          itemJsonArray = JSON.parse(itemJsonArrayStr);
          localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
        }
        let tbody = document.getElementById("tbody");
        let str = "";
        itemJsonArray.forEach((element, index) => {
          if (index == 0) {
            return;
          } else {
            str += `<tr>
              <th scope="row">${index}</th>
              <td>${element[0]}</td>
              <td>${element[1]}</td>
              <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete Task</button></td>
            </tr>`;
          }
        });
        tbody.innerHTML = str;
      }
      function cleartasks() {
        if (confirm("Are you sure you want to clear all your tasks?")) {
          console.log("Clearing the Local Storage");
          localStorage.clear();
          update();
        }
      }