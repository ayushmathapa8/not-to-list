let entrylist = [];
let badlist = [];
const weekHours = 7 * 24;

// get the data on form submit
const handleOnsubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");

  const obj = { task, hr };

  // are we allow to add new entry
  const ttlHrs = getTotalHours();
  console.log(ttlHrs, obj);

  if (ttlHrs + hr >= weekHours) {
    return alert("you have exceeded the weekly hours,cannot add this");
  }

  entrylist.push(obj);
  display(entrylist);
};
// display list on the dom

const display = (arg) => {
  let str = "";

  arg.map((item, i) => {
    str += `
  <tr>
  <td>
          ${item.task}
      </td>
      <td>${item.hr}hrs</td>

    <td class="text-end">
        <button
        onclick="handleOndeleteEntrylist(${i})"
        class="btn btn-danger">
        <i class="fas fa-trash-restore"></i>
        </button>

        <button
        onclick="switchToBadList(${i})"
         class="btn btn-success"><i class="fas fa-arrow-right"></i></button>
    </td>
  </tr>`;
  });
  document.getElementById("entrylist").innerHTML = str;
};
// display list on the dom

const badListDisplay = (arg) => {
  let str = "";

  arg.map((item, i) => {
    str += `
  <tr>


      <td>
          ${item.task}
      </td>
      <td>${item.hr}hrs</td>

    <td class="text-end">
        <button
        onclick="handleOndeleteEntrylist(${i})"
        class="btn btn-danger"><i class="fas fa-trash-restore"></i></button>


        <button  class="btn btn-success"><i class="fas fa-arrow-right"></i></button>
    </td>
  </tr>`;
  });
  document.getElementById("badlist").innerHTML = str;
};
// delete item from entry list
const handleOndeleteEntrylist = (i) => {
  if (!confirm("Are you sure you want to delete this entry?")) return;
  const filteredArg = entrylist.filter((item, index) => index !== 1);
  entrylist = filteredArg;
  display(entrylist);
  console.log(i);
};
// switch data from bad list to entry list
const switchToBadList = (i) => {
  const itemToBeSwitched = entrylist.splice(i, 1);
  badlist.push(itemToBeSwitched[0]);
  display(entrylist);
  badListDisplay(badlist);
};

// / switch data from bad list to entry list
const switchToEntrylist = (i) => {
  const itemToBeSwitched = badlist.splice(i, 1);
  entrylist.push(itemToBeSwitched[0]);
  display(entrylist);
  badListDisplay(badlist);
};

const handleOndeleteBadlist = (i) => {
  if (!confirm("Are you sure you want to delete this entry?")) return;
  const filteredArg = badlist.filter((item, index) => index !== i);
  badlist = filteredArg;
  badlistdisplay(badlist);
};

const getTotalHours = () => {
  const ttlEntryList = entrylist.reduce((acc, item) => acc + item.hr, 0);
  const ttlBadList = badlist.reduce((acc, item) => acc + item.hr, 0);

  const total = ttlEntryList + ttlBadList;
  document.getElementById("totalHours").innerText = total;
};

const badTotalhours = () => {
  const ttlbadhr = badlist.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("ttlbadhr").innerText = ttlbadhr;
};
