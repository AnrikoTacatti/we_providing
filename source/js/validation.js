(function (){
    var me = {};
    function isEmail(email){
        var re =/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        
        return re.test(email);
    };
    
    me.isNumber = function (number){
        var re =/^\d+$/;
        
        return re.test(number);
    };
    
    me.isNotEmpty = function (str) {
        return Boolean(str);
    };
    
    
    providing.validation = me;
    
}());