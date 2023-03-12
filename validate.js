function checkForm(event) {
    let form = document.getElementById( 'tosForm' );
    let elements = form.elements;
    let eventWidget = document.getElementById("event");
    let dayWidget = document.getElementById("day");
    let startWidget = document.getElementById("start");
    let endWidget = document.getElementById("end");
    let phoneWidget = document.getElementById("phone");
    let locationWidget = document.getElementById("location");
    let extraWidget = document.getElementById("extra");
    let urlWidget = document.getElementById("url");
 
    // Cancel form submission if tos not checked

    for (var i =0;i<elements.length;i++){
        if(elements[i].length==0){
            document.getElementsByTagName("input").innerHTML = "Please fill out this field.";
        }
    }
    if (!eventWidget.checkEvent(event)) {
        document.getElementById("event").innerHTML = "Please match the requested format.";
        event.preventDefault();
    }
 }

 function checkEvent(event){
     return event.length>0 && event.length<15;
 }
 
 let formWidget = document.querySelector("#tosForm");
 formWidget.addEventListener("submit", checkForm);