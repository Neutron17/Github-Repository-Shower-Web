let projList = document.getElementById("proj-list");
let user = document.getElementById("user");
let usrInp = document.getElementById("usr");
//let owner = "Neutron17";
let root = document.body;
let arr = [];
let prevOwn = "Neutron17";
async function foo(owner) {
  if (owner != prevOwn) {
    projList.innerHTML = "";
    prevOwn = owner;
  }
  let x = await fetch("https://api.github.com/users/" + owner + "/repos");
  let data = await x.json();
  let done = false;
  for (i of JSON.parse(JSON.stringify(data))) {
    if (!done) {
      owner = i.owner.login;
      user.innerHTML += "<i>" + owner + "</i>";
      done = true;
    }
    if (i.fork) continue;
    //console.log(i.name);
    if (i.description == null) i.description = "";
    let str =
      '<project-prototype name="' +
      i.name +
      '" desc="' +
      i.description +
      '" url="' +
      i.html_url +
      '" lang="' +
      i.language +
      '"';
    if (i.archived == true) str += "Archived";
    if (i.disabled == true) str += "Disabled";
    str += "></project-prototype>";
    projList.innerHTML += str;
  }
}
function submit() {
  //console.log("submit "+usrInp.value+" "+user.innerHTML); // Unsafe, no XSS protection
  user.innerHTML = user.innerHTML.replace(
    user.innerHTML.split(" ")[user.innerHTML.split(" ").length - 1],
    usrInp.value
  );
  let owner = user.innerHTML.split(" ")[user.innerHTML.split(" ").length - 1];
  //console.log("own: "+owner)
  foo(owner);
  //user.value = user.innerHTML.replace(user.innerHTML.split(" ")[user.innerHTML.split(" ").length  ], usrInp.value)
}
