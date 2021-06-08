function registration_numbers(existingReg) {
   var objC = {} 
    var objreg = existingReg || []
    var reg = ""
    function isReapted(regs){
    
        var repeated = false;
        for(var i=0; i<regs.length;i++){
            var elem = regs[i];

            if(objC[elem] === undefined){
                objC[elem]=0;
            }
        }

        var registration = singleReg();

        if(objC.hasOwnProperty(registration)){
            repeated=true
        }
       return repeated
       
    }
    
    function setReg(regs) {
        regs = regs.toUpperCase()
        var regex = /^((CA|CY|CL)\s\d{3}\s\d{3})$|^((CA|CY|CL)\s\d{3}\-\d{3})$/
        var regexTest = regex.test(regs)
        reg = regs
        if (!objreg.includes(regs)) {
            objreg.push(regs)
          
        }
      return regexTest;
    }
    function singleReg() {

        return reg
    }

    function getReglist() {
        return objreg;
    }
    function forTown(registration){
       var list = []
       for(var i =0;i < objreg.length;i++){
        if(objreg[i].startsWith(registration)){
            list.push(objreg[i])
        }
 
       }
       return list;
       
    }

    
    return {
        setReg,
        getReglist,
        singleReg,
        isReapted,
        forTown
    }

}