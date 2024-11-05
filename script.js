const navPage = document.querySelector(".navPage ul");
const projectsToggel_btn = document.querySelector("#ProjectsToggle_btn");
projectsToggel_btn.addEventListener("click", function () {
  const allIcons = navPage.querySelectorAll("[data-name='checked']");
  allIcons.forEach((icon) => icon.removeAttribute("data-name"));
  let targetIcon = document.querySelector(".projectStarIcon");
  targetIcon.setAttribute("data-name", "checked");
});
navPage.addEventListener("click", function (e) {
  console.log("clicked");
  let triggeredIcon = e.target;

  if (triggeredIcon.hasAttribute("class")) {
    let classes = triggeredIcon.getAttribute("class").split(" ")[2];

    let triggeredIconClass = (classes) => {
      [
        "homeStarIcon",
        "aboutStarIcon",
        "projectStarIcon",
        "contactStarIcon",
      ].includes(classes);
    };

    if (triggeredIconClass) {
      const allIcons = navPage.querySelectorAll("[data-name='checked']");
      allIcons.forEach((icon) => icon.removeAttribute("data-name"));

      triggeredIcon.setAttribute("data-name", "checked");
    }
  }
});

const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function () {
  // FORM VALIDATION

  let props = {
    name: document.querySelector("#userName").value,
    email: document.querySelector("#email").value,
    message: document.querySelector("#message").value,
  };

  function validateName() {
    let nameErrElement = document.getElementById("nameErr");
    if (props.name.length == 0) {
      nameErrElement.style.display = "inline";
      nameErrElement.innerText = "Enter the name";
      return false;
    }
    nameErrElement.style.display = "none";
    return true;
  }
  validateName() 
  function validateEmail() {
    let emailErrElement = document.getElementById("emailErr");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (props.email.length == 0) {
      emailErrElement.style.display = "inline";
      emailErrElement.innerText = "Enter the email";
      return false;
    }

    if (!emailPattern.test(props.email)) {
      emailErrElement.style.display = "inline";
      emailErrElement.innerText = "Enter the correct email address";
      return false;
    }
    emailErrElement.style.display = "none";
    return true;
  }
  validateEmail()
  function validateMsg() {
    let msgErrElement = document.getElementById("msgErr");
    let requiredChr = 25;
    if (props.message.length < requiredChr) {
      msgErrElement.style.display = "inline";
      msgErrElement.innerText = "minimum 25 charecters required";

      return false;
    }
    msgErrElement.style.display = "none";
    return true;
  }
  validateMsg()
  function sendEmail() {
    let serviceID = "service_imj62d3";
    let templateID = "template_yw83twk";
    emailjs
      .send(serviceID, templateID, props)
      .then((res) => {
        console.log(res);
        document.querySelector("#userName").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#message").value = "";
        alert("SUBMITTED SUCCESSFULLY");
      })
      .catch((err) => console.log(err));
  }

  if (validateName() && validateEmail() && validateMsg()) {
    sendEmail();
  } else {
    alert("Fix the errors");
  }
});
