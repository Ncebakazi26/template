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


//old code
//var RegistrationNum = registration_numbers()

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
      //appendElement(x)
    }
  }
  
   //function appendElement(newValue) {
   
    
//     newValue = newValue.toUpperCase()
//     var element = document.createElement("li");
//     var textnode = document.createTextNode(newValue);
//     element.appendChild(textnode);
//     element.classList.add('reg_number');
//     document.getElementById("myList").appendChild(element);
  //}
  function registration_temp() {
    list_tempElem.innerHTML = userTemplate({RegistrationNum:x})
    var value1 = document.querySelector("#form_temp").value
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
    registrationList = JSON.parse(localStorage.getItem('registrations_temp'))
    if(RegistrationNum.setReg(value1)) {
   
      if (registrationList) {
        if (RegistrationNum.isReapted(registrationList)) {
          setTimeout(function () {
            displayMessageElem.innerHTML = "This registration number already exist"
            displayMessageElem.classList.add("error")
          }, 0);
          setTimeout(function () {
            displayMessageElem.innerHTML = ""
          }, 2000);
  
        } else {
          localStorage.setItem('registrations_temp', JSON.stringify(RegistrationNum.getReglist()));
          appendElement(value1)
        }
      } else {
        localStorage.setItem('registrations_temp', JSON.stringify(RegistrationNum.getReglist()));
        appendElement(value1)
      }
      textclear()
    }
    else{
        setTimeout(function(){
        displayMessageElem.innerHTML = "Please follow this format CA 123-123/ CA 123 123"
        displayMessageElem.classList.add("error")
       
      },0);
      setTimeout(function(){
        displayMessageElem.innerHTML = ""
      }, 2000); 
    }
  }
  
  function forEachTown_temp() {
    var radiobutton = document.querySelector(".reg_temp:checked")
    document.getElementById("myList_temp").innerHTML = ""
    if(radiobutton){
      var townList= RegistrationNum.forTown(radiobutton.value)
  
      if(townList.length !== 0){
        for (var i = 0; i < townList.length; i++){
          if (townList[i].startsWith(radiobutton.value)) {
            appendElement(townList[i])
          
            displayMessageElem.innerHTML = ""
            textclear()
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
            textclear()
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
      textclear()
    }
    
    
  }
  function displayAll_temp() {
     document.getElementById("myList_temp").innerHTML = ""
    if (registrationList) {
      for (var i = 0; i < registrationList.length; i++) {
        var x = registrationList[i]
        appendElement(x)
      }
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
    localStorage.clear()
    location.reload()
  });
