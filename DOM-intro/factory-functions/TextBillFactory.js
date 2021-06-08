function TextBill(){
    var callsTotal = 0;
    var smsTotal=0;
    function smsAndcalls(billString){
     var billTypeEntered = billString.trim();
        if (billTypeEntered === "call"){
            callsTotal += 2.75
        }
        else if (billTypeEntered === "sms"){
            smsTotal += 0.75;
        }
    }
        function getcallTotal(){
            return callsTotal;
        }
        function getsmsTotal(){
            return smsTotal;
        }
        function getTotal(){
          return  callsTotal+smsTotal;
        }
        function OrangeAndRed(){
            if(getTotal()>=30 && getTotal() < 50){
                return "warning";
            }
            if(getTotal()>=50){
                return "danger";
            }
             }
    return{
        smsAndcalls,
        getcallTotal,
        getsmsTotal,
        getTotal,
        OrangeAndRed,
    }
}