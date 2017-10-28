(function(){
 
    
  var openFormButton = document.querySelector('.arrow-down');
  var form = document.querySelector('.form');
    
    if (openFormButton){
        openFormButton.addEventListener('click', function(e){
        e.preventDefault();    
        providing.form.open();
        })
    }
    
    if (form){
        form.addEventListener('submit', function(e){
            if (providing.form.isValid()) {
                console.log('All good');
            }
            
            else {
                console.log('Is not valid');
            }
            e.preventDefault();
        
        });
    }
}());