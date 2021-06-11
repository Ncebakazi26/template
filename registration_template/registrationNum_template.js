var addbtn_temp = document.querySelector(".Addbtn_temp")
var townbtn_temp = document.querySelector(".town_temp")
var displaybtn_temp = document.querySelector(".display_temp")
var clearbtn_temp = document.querySelector(".clear_temp")

var textareaElem = document.querySelector("#form_temp")
var list_tempElem = document.querySelector(".myList_temp")
var displatElem = document.querySelector(".myList1")
var displayMessageElem = document.querySelector(".message_temp")

var templateSource = document.querySelector(".userTemplate").innerHTML;
var userTemplate = Handlebars.compile(templateSource);


function textclear_temp() {
  textareaElem.value = ""
  document.getElementById('Cape_temp').checked = false
  document.getElementById('Bellville_temp').checked = false
  document.getElementById('Paarl_temp').checked = false

}
var registrationList_temp = JSON.parse(localStorage.getItem('registrations_temp'))
var RegistrationNum = registration_numbers(registrationList_temp)
var regsTemplate = []

if (registrationList_temp) {
  for (var i = 0; i < registrationList_temp.length; i++) {
    var x = registrationList_temp[i];
    var obj = { regNumber: x };
    regsTemplate.push(obj)
  }
}
var userDataHTML = userTemplate({

  RegList: regsTemplate
})

list_tempElem.innerHTML = userDataHTML
function registration_temp() {
  var value1 = (document.querySelector("#form_temp").value).toUpperCase()
  var arrayReg = regsTemplate

  if (value1 === "") {
    setTimeout(function () {
      displayMessageElem.innerHTML = "Please enter registration number"
      displayMessageElem.classList.add("error")
    }, 0);
    setTimeout(function () {
      displayMessageElem.innerHTML = ""
    }, 2000);
    return false
  }
  RegistrationNum.setReg(value1)
  registrationList_temp = JSON.parse(localStorage.getItem('registrations_temp'))

  if (RegistrationNum.setReg(value1)) {


    if (registrationList_temp) {
      if (RegistrationNum.isReapted(registrationList_temp)) {
        setTimeout(function () {
          displayMessageElem.innerHTML = "This registration number already exist"
          displayMessageElem.classList.add("error")
        }, 0);
        setTimeout(function () {
          displayMessageElem.innerHTML = ""
        }, 2000);
        textclear_temp()
        return false
        
      }
      
      else {
      localStorage.setItem('registrations_temp', JSON.stringify(RegistrationNum.getReglist()));
       
         location.reload() 
      }
      
    } else {
      localStorage.setItem('registrations_temp', JSON.stringify(RegistrationNum.getReglist()));
    }
    var obj = { regNumber: value1 };
    arrayReg.push(obj)

    var userDataHTML = userTemplate({
      RegList: arrayReg
    })
     list_tempElem.innerHTML = userDataHTML
    textclear_temp()
  }
  
  else {
    setTimeout(function () {
      displayMessageElem.innerHTML = "Please follow this format CA 123-123/ CA 123 123"
      displayMessageElem.classList.add("error")

    }, 0);
    setTimeout(function () {
      displayMessageElem.innerHTML = ""
    }, 2000);
  }
  textclear_temp()
}

function forEachTown_temp() {
  var arrayReg = []
  var radiobutton = document.querySelector(".reg_temp:checked")
  document.querySelector(".myList_temp").innerHTML = ""
  if (radiobutton) {
    var townList = RegistrationNum.forTown(radiobutton.value)

    if (townList.length !== 0) {
      for (var i = 0; i < townList.length; i++) {
        if (townList[i].startsWith(radiobutton.value)) {
          var obj = { regNumber: townList[i] };
          arrayReg.push(obj)

          displayMessageElem.innerHTML = ""
          textclear_temp()
          
        }
      }
    }
   
    else {
      setTimeout(function () {
        displayMessageElem.innerHTML = "There is no registration number for this town"
        displayMessageElem.classList.add("error")
      }, 0);
      setTimeout(function () {
        displayMessageElem.innerHTML = ""
        textclear_temp()
      }, 2000);
    }
  }
  else {
    setTimeout(function () {
      displayMessageElem.innerHTML = "Please select a town"
      displayMessageElem.classList.add("error")
    }, 0);
    setTimeout(function () {
      displayMessageElem.innerHTML = ""
    }, 2000);
    textclear_temp()
  }
  var userDataHTML = userTemplate({
    RegList: arrayReg
  })

  list_tempElem.innerHTML = userDataHTML

}
function displayAll_temp() {
  var regsTemplate = []
  document.querySelector(".myList_temp").innerHTML = ""

  if (registrationList_temp) {
    for (var i = 0; i < registrationList_temp.length; i++) {
      var x = registrationList_temp[i];
      var obj = { regNumber: x };
      regsTemplate.push(obj)
      location.reload()
    }
    var userDataHTML = userTemplate({

      RegList: regsTemplate
    })

    list_tempElem.innerHTML = userDataHTML.classList.add('reg_number_temp');
    
  }


  else {
    setTimeout(function () {
      displayMessageElem.innerHTML = "Currently there are no existing registration numbers"
      displayMessageElem.classList.add("error")
    }, 0);
    setTimeout(function () {
      displayMessageElem.innerHTML = ""

    }, 2000);
  }
 
}

addbtn_temp.addEventListener('click', registration_temp)
townbtn_temp.addEventListener('click', forEachTown_temp)
displaybtn_temp.addEventListener('click', displayAll_temp)

clearbtn_temp.addEventListener('click', function () {
  localStorage.removeItem("registrations_temp")
  location.reload()
});
