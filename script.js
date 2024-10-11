
const tbody = document.querySelector("tbody");
const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const ul = document.querySelector("#mylist");

let tableData = JSON.parse(localStorage.getItem("tableData")) || [];
let editObject = null;

const stdData = { name: "", fathername: "", class: "", month: "", fee: "" };

inputs.forEach(input => input.addEventListener("input", e => {
  stdData[e.target.name] = e.target.value;
}));

const renderData = () => {
  tbody.innerHTML = tableData.map(item => `
    <tr>
      <td class="border border-black">${item.name}</td>
      <td class="border border-black">${item.fathername}</td>
      <td class="border border-black">${item.class}</td>
      <td class="border border-black">${item.month}</td>
      <td class="border border-black">${item.fee}</td>
      <td class="border border-black py-2">
        <button class="px-3 py-1 rounded-md bg-red-600 text-white" onclick="deleteRow(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="px-3 py-1 rounded-md bg-green-600 text-white" onclick="editRow(${item.id})">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </td>
    </tr>`).join("");
  ul.innerHTML = tableData.map(item => `<li>${item.name}</li>`).join("");
  
  // Save updated tableData to local storage
  localStorage.setItem("tableData", JSON.stringify(tableData));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editObject) {
    const index = tableData.findIndex(item => item.id === editObject.id);
    tableData[index] = { ...stdData, id: editObject.id };
    editObject = null;
  } else {
    tableData.push({ ...stdData, id: tableData.length + 1 });
  }
  renderData();
  form.reset();
});

const deleteRow = (id) => {
  tableData = tableData.filter(item => item.id !== id);
  renderData();
};

const editRow = (id) => {
  editObject = tableData.find(item => item.id === id);
  inputs.forEach((input, index) => {
    input.value = editObject ? Object.values(editObject)[index] : "";
  });
};

// Render data from local storage on page load
window.addEventListener("load", renderData);
