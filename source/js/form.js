(function(){
    var me = {};
    var form = document.querySelector('.form-container');
    var closeButton = null;
    
    function onClose() {
        me.close();
        
        closeButton.removeEventListener('click', onClose);
    }
    me.open = function(){
        form.classList.remove('is-hidden');
        closeButton = document.querySelector('.form__close-button');
        closeButton.addEventListener('click',onClose);
    };
    
    me.close = function (){
        form.classList.add('is-hidden');
    };
    
    me.isValid = function (){
       if(!me.isAllCompleted(document.querySelectorAll('[data-valid="required"]'))){
           console.log('Заполните пожалуста все необходимые поля');
           return false;
       }
        else if (providing.validation.isEmail(document.querySelector('[data-email]'))){
            console.log('Не верный Email');
            return false;
        }
        else if (providing.validation.isNumber(document.querySelector('[data-number]'))) {
            console.log('Не верный номер');
            return false;
        }
           
            return true;
    };
        
    
    
    me.isAllCompleted = function (data){
        var result = true;
        
        for (var i = 0; i < data.length; i++){
            if (!providing.validation.isNotEmpty(data[i].value)){
                result = false;
                break;
            }
        }
        
        return result;
    };
    window.providing.form = me;
    
}());