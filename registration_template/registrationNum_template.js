var addbtn_temp = document.querySelector(".Addbtn_temp")
var townbtn_temp = document.querySelector(".town_temp")
var displaybtn_temp = document.querySelector(".display_temp")
var clearbtn_temp = document.querySelector("clear_temp")

var textareaElem = document.querySelector("#form_temp")
var list_tempElem = document.querySelector("#myList_temp")

var templateSource = document.querySelector(".userTemplate").innerHTML;
var userTemplate = Handlebars.compile(templateSource);


//old code
var RegistrationNum = registration_numbers()

function textclear() {
    textareaElem.value = ""
    document.getElementById('Cape_temp').checked = false
    document.getElementById('Bellville_temp').checked = false
    document.getElementById('Paarl_temp').checked = false
  
  }
  var registrationList = JSON.parse(localStorage.getItem('registrations_temp'))
  var RegistrationNum = registration_numbers(registrationList)
  if (registrationList) {
    for (var i = 0; i < registrationList.length; i++) {
      var x = registrationList[i]
      appendElement(x)
    }
  }
  
//   function appendElement(newValue) {
   
    
//     newValue = newValue.toUpperCase()
//     var element = document.createElement("li");
//     var textnode = document.createTextNode(newValue);
//     element.appendChild(textnode);
//     element.classList.add('reg_number');
//     document.getElementById("myList").appendChild(element);
//   }
  function registration() {
    list_tempElem.innerHTML = userTemplate({RegistrationNum:x})   
   
    var value = document.querySelector("#form_temp").value
   
    
    if (value === "") {
      setTimeout(function () {
        displayMessage.innerHTML = "Please enter registration number"
        displayMessage.classList.add("error")
      }, 0);
      setTimeout(function () {
        displayMessage.innerHTML = ""
      }, 2000);
      return false
    }
    RegistrationNum.setReg(value)
    registrationList = JSON.parse(localStorage.getItem('registrations_temp'))
    if(RegistrationNum.setReg(value)) {
   
      if (registrationList) {
        if (RegistrationNum.isReapted(registrationList)) {
          setTimeout(function () {
            displayMessage.innerHTML = "This registration number already exist"
            displayMessage.classList.add("error")
          }, 0);
          setTimeout(function () {
            displayMessage.innerHTML = ""
          }, 2000);
  
        } else {
          localStorage.setItem('registrations_temp', JSON.stringify(RegistrationNum.getReglist()));
          appendElement(value)
        }
      } else {
        localStorage.setItem('registrations_temp', JSON.stringify(RegistrationNum.getReglist()));
        appendElement(value)
      }
      textclear()
    }
    else{
        setTimeout(function(){
        displayMessage.innerHTML = "Please follow this format CA 123-123/ CA 123 123"
        displayMessage.classList.add("error")
       
      },0);
      setTimeout(function(){
        displayMessage.innerHTML = ""
      }, 2000); 
    }
  }
  
  function forEachTown() {
    var radiobutton = document.querySelector(".reg_temp:checked")
    document.getElementById("myList_temp").innerHTML = ""
    if(radiobutton){
      var townList= RegistrationNum.forTown(radiobutton.value)
  
      if(townList.length !== 0){
        for (var i = 0; i < townList.length; i++){
          if (townList[i].startsWith(radiobutton.value)) {
            appendElement(townList[i])
          
            displayMessage.innerHTML = ""
            textclear()
          }
        }
      }
    
  
        else {
          
          setTimeout(function () {
            displayMessage.innerHTML = "There is no registration number for this town"
            displayMessage.classList.add("error")
          }, 0);
          setTimeout(function () {
            displayMessage.innerHTML = ""
            textclear()
          }, 2000);
      }
    } 
    else {
      setTimeout(function () {
        displayMessage.innerHTML = "Please select a town"
        displayMessage.classList.add("error")
      }, 0);
      setTimeout(function () {
        displayMessage.innerHTML = ""
      }, 2000);
      textclear()
    }
    
    
  }
  function displayAll() {
     document.getElementById("myList_temp").innerHTML = ""
    if (registrationList) {
      for (var i = 0; i < registrationList.length; i++) {
        var x = registrationList[i]
        appendElement(x)
      }
    }
    else {
      setTimeout(function () {
        displayMessage.innerHTML = "Currently there are no existing registration numbers"
        displayMessage.classList.add("error")
      }, 0);
      setTimeout(function () {
        displayMessage.innerHTML = ""
  
      }, 2000);
    }
  }
  
  
  addbtn_temp.addEventListener('click', registration)
  townbtn_temp.addEventListener('click', forEachTown)
  displaybtn_temp.addEventListener('click', displayAll)
  
  clearbtn_temp.addEventListener('click', function () {
    localStorage.clear()
    location.reload()
  });
