//Associate the click event to correponding handler function
document.getElementById("btn_save").addEventListener("click",RetrievePages);

//handler to perform almost the entire task
function RetrievePages(){
	
	var fourmTabs = new Array(); //array to retrieve ID's of the opened tabs
	
	chrome.tabs.query({}, function (tabs) { //function to retrieve the tabs that are opened in current window
	    for (var i = 0; i < tabs.length; i++) {
	        fourmTabs[i] = tabs[i].url;
	    }
	    
	    //Below are the variables to retrieve the values from DOM
	    var links = new String(); //Message template variable
	    var name = document.getElementById('name').value;//name is the session name     
	    var user = document.getElementById('user').value;
	    var email_from = document.getElementById('email_from').value;
	    name = String(name);
	    user = String(user);
	    email_from = String(email_from);


	    links+= "<b> From email: </b>  <i>"+email_from+"</i> <br/>";
	    links+= "<b>Session name:  <i></b> "+name+" </i></h3><br/>";
	    links+= "<b>Session date:   <i></b>"+ new Date().toUTCString()+ "</i><br/> <br/><br/>" ;
	    links+= "<table>"

	    //Below is the loop to build actually the Message template
	    for (var i = 0, a=1; i < fourmTabs.length-1; i++,a++) {
	        if (fourmTabs[i] != null)
	        	{
	    
	        		links +="<tr><td>"
	        		links += a+" - <a href='";
	        		links += String(fourmTabs[i]);
	        		links += "'><b>"+String(fourmTabs[i])+"</b></a></td></tr><br/>";
	        	}
	        else {
	           
	        }
    	}
    	links+="</table>"

    
    var email = document.getElementById('email').value; //target email variable
    email = String(email);

	var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; //To validate the email
    if (pattern.test(email)) {
	    
	    var d = new Date();
	    d = String(d);

	    var subject = "Links browsed by    "+user.toUpperCase();

	    //Below is the email sending part via Mandrill app free version.
	    $.ajax({
	  		type: "POST",
			  url: "https://mandrillapp.com/api/1.0/messages/send.json",
			  data: {
			    'key': '_G97b4x1hGzqM7C7NsmuvQ',
			    'message': {
			      'from_email': 'freezeit.session@gmail.com',
			      'to': [
			          {
			            'email': email,
			            'type': 'to'
			          }
			          
			        ],
			      'autotext': 'true',
			      'subject': subject,
			      'html': links
			    }
			  }
			 }).done(function(response) {
			   
			 });

	} else {
        alert('Bad email address: ' + email);
        
    }	 
});
	
}