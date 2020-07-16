document.addEventListener("DOMContentLoaded", () => {
  const dropDownMenu = document.querySelectorAll(".dropdown");
  const optionsButton = document.querySelectorAll(".button");
  const shareAlert = document.querySelectorAll(".shareAlert");
  const linkCopy = document.getElementById("linkCopy");
  const test = document.getElementById("test");

    optionsButton.addEventListener("click", (e) => {
      dropDownMenu.classList.toggle("is-active");
      console.log("click");
    });

  test.addEventListener("click", (e) => {
    let clipboard= new Clipboard('#test', {
        text: function() {
            return document.querySelector('input[type=hidden]').nodeValue;
        }
    })
    clipboard.on('success', function(e) {
        alert('Copied!');
    })
    $("#input-url").val(location.href);

  });

  function onSubmit() {
    let conf = confirm("REally?");
    if (conf) {
      return true
    }
    else return false;
  }
});
