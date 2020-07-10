

//JS loading after loading the html page
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  
  // page elements
  const form = document.querySelector(".todo-control");
  const todoList = document.getElementById("todo");
  const completedList = document.getElementById("completed");
  const headerInput = document.querySelector(".header-input");
  //
  const btnPlus = document.getElementById("add");
  // hang the creation of the element on the + button
  btnPlus.addEventListener("click", function () {
    if (!renderItem) {
      renderItem;
    }
  });

  //create an object in a cat get lists
  let data = {
    todo: [],
    completed: [],
  };

  // check the availability of data in the locale
  if (localStorage.getItem("localData")) {
    data = JSON.parse(localStorage.getItem("localData"));
  }

  //the function checks the existing data in the locale and renders them to the object if they exist
  const renderItemForUpdate = function () {
    // if the object is empty
    if (!data.todo.length && !data.completed.length) {
      return;
    }
    // if the object is not empty, then iterate over it
    for (let i = 0; i < data.todo.length; i++) {
      renderItem(data.todo[i]);
    }
    for (let i = 0; i < data.completed.length; i++) {
      renderItem(data.completed[i], true);
    }
  };

  // add / update function in localStorage
  const dataUpdateToLocalS = function () {
    localStorage.setItem("localData", JSON.stringify(data)); // JSON такой формат покажет нам наш новый объект
    console.log(localStorage.getItem("localData"));
  };

  // add an element and write to the store, add to the object (in that place) and update the input
  // and start rendering one element
  const addItem = function (text) {
    renderItem(text);
    headerInput.value = "";
    data.todo.push(text);

    // start updating localStorege
    dataUpdateToLocalS();
  };

  // button functions

  // function removes an element from its parent
  const itemRemove = function (elem) {
    // get the parent div todo-buttons and in it li
    const item = elem.parentNode.parentNode;
    // get ul
    const itemParent = item.parentNode;
    // get ul`s id
    const id = itemParent.id;
    // get the text
    const text = item.textContent;

    // the deletion condition made from the object
    if (id === "todo") {
      data.todo.splice(data.todo.indexOf(text), 1);
    } else {
      data.completed.splice(data.completed.indexOf(text), 1);
    }

    // delete the created item from the page
    itemParent.removeChild(item);

    dataUpdateToLocalS();
  };

  // the transfer function to the list is completed
  // make the item completed (move to the list of completed)
  const itemComplete = function (elem) {
    // get the parent div todo-buttons and in it li
    const item = elem.parentNode.parentNode;
    // get ul
    const itemParent = item.parentNode;
    // get ul`s id
    const id = itemParent.id;
    // get text
    const text = item.textContent;

    // create a target variable
    let target;

    // write a condition that defines the target
    if (id === "todo") {
      target = completedList;
    } else {
      target = todoList;
    }

    // we write a condition we throw in fulfilled \ not fulfilled in our object
    if (id === "todo") {
      data.todo.splice(data.todo.indexOf(text), 1); // took the item
      data.completed.push(text); // placed in executed
    } else {
      // it's the other way around
      data.completed.splice(data.completed.indexOf(text), 1);
      data.todo.push(text);
    }

    // render our elements (transfer to completed)
    itemParent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    dataUpdateToLocalS();
  };

  // create elements, write values ​​and pass on page
  // Writes a cat based on the data to the store
  const renderItem = function (text, completed = false) {
    //create elements
    const item = document.createElement("li");
    const btnBlock = document.createElement("div");
    const btnRemove = document.createElement("button");
    const btnComplete = document.createElement("button");

    // target where we will throw the necessary elements immediately if they were already in the locale
    let list;
    if (completed) {
      list = completedList;
    } else {
      list = todoList;
    }

    // Form, create a block sequentially
    // add classes to elements
    item.classList.add("todo-item");
    btnBlock.classList.add("todo-buttons");
    btnRemove.classList.add("todo-remove");
    btnComplete.classList.add("todo-complete");

    item.textContent = text;

    // put the buttons in the block
    btnBlock.appendChild(btnRemove);
    btnBlock.appendChild(btnComplete);

    // insert block into item
    item.appendChild(btnBlock);

    // hang events on buttons
    btnRemove.addEventListener("click", function (event) {
      itemRemove(event.target);
    });

    btnComplete.addEventListener("click", function (event) {
      itemComplete(event.target);
    });

    // put the assembled block first on the page
    list.insertBefore(item, list.childNodes[0]);
  };

  form.addEventListener("submit", function (even) {
    // cancel page reload
    event.preventDefault();

    if (headerInput.value !== "") {
      addItem(headerInput.value);
    }
  });

  // call a function that, in the presence of data, will render them
  renderItemForUpdate();
});

///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
