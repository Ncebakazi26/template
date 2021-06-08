function RadioBill(){
    var callsTotal = 0;
    var smsTotal=0;
    function smsAndcalls1(billString){
        var billTypeEntered = billString.trim();
        if (billTypeEntered === "call"){
            callsTotal += 2.75
        }
        else if (billTypeEntered === "sms"){
            smsTotal += 0.75;
        }
    }
        function getcallTotal1(){
            return callsTotal;
        }
        function getsmsTotal1(){
            return smsTotal;
        }
        function getTotal1(){
          return  callsTotal+smsTotal;

        }
        function OrangeAndRed1(){
            if(getTotal1()>=30 && getTotal1()<=50){
                return "warning";
            }
            if(getTotal1()>=50){
                return "danger";
            }
             }
    return{
        smsAndcalls1,
        getcallTotal1,
        getsmsTotal1,
        getTotal1,
        OrangeAndRed1,
    }
}