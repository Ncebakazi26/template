// get a reference to the sms or call radio buttons
var billItemTypeRadio = document.querySelector(".billItemTypeRadio")
var callTotalTwo1= document.querySelector(".callTotalTwo")
var smsTotalTwo1 = document.querySelector(".smsTotalTwo")
var TotalTwo1 = document.querySelector(".totalTwo")
//get a reference to the add button
var radioBillAddBtn = document.querySelector(".radioBillAddBtn")
//create a variable that will keep track of the total bill
var callsTotal1 = 0;
var smsTotal1 = 0;

var templateSource = document.querySelector(".userTemplate").innerHTML;
var userTemplate = Handlebars.compile(templateSource);

var RadioInst= RadioBill()
//add an event listener for when the add button is pressed
function BillTotal(){
    // get the value entered in the billType textfield
    var checkedRadioBtn = document.querySelector("input[name='billItemType']:checked");
    if (checkedRadioBtn){
        var billItemType = checkedRadioBtn.value
    }
        // billItemType will be 'call' or 'sms
RadioInst.smsAndcalls1(billItemType)
    
    //update the totals that is displayed on the screen.
    callTotalTwo1.innerHTML =userTemplate({callTotal : RadioInst.getcallTotal1().toFixed(2)});
    smsTotalTwo1.innerHTML = userTemplate({smsTotal :  RadioInst.getsmsTotal1().toFixed(2)});
    TotalTwo1.innerHTML = userTemplate({Total :  RadioInst.getTotal1().toFixed(2)}) ;

    TotalTwo1.classList.remove("danger");
    TotalTwo1.classList.remove("warning");

    TotalTwo1.classList.add(RadioInst.OrangeAndRed1())
}

radioBillAddBtn.addEventListener('click',BillTotal);
//in the event listener get the value from the billItemTypeRadio radio buttons
// * add the appropriate value to the running total
// * add nothing for invalid values that is not 'call' or 'sms'.
// * display the latest total on the screen
