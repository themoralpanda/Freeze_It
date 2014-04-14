document.getElementById("btn_save").addEventListener("click",RetrievePages);

function RetrievePages(){
	window.alert("Hi - from inside the function");
	var fourmTabs = new Array();
	chrome.tabs.query({}, function (tabs) {
	    for (var i = 0; i < tabs.length; i++) {
	        fourmTabs[i] = tabs[i].url;
	    }
	    
	    var links = new String();
	    var name = document.getElementById('name').value;
	    //name is the session name
	    var user = document.getElementById('user').value;
	    name = String(name);
	    user = String(user);
	    links+= "<b> From: </b>  <i>"+user+"</i> <br/>";
	    links+= "<b>Session name:  <i></b> "+name+" </i></h3><br/>";
	    links+= "<b>Session date:   <i></b>"+ new Date().toUTCString()+ "</i><br/> <br/><br/>" ;
	    links+= "<table>"
	    for (var i = 0, a=1; i < fourmTabs.length-1; i++,a++) {
	        if (fourmTabs[i] != null)
	        	{
	        		console.log(fourmTabs[i]);
	        		links +="<tr><td>"
	        		links += a+" - <a href='";
	        		links += String(fourmTabs[i]);
	        		links += "'><b>"+String(fourmTabs[i])+"</b></a></td></tr><br/>";
	        	}
	        else {
	           console.log("??" + i);
	        }
    	}
    	links+="</table>"

    console.log(String(links));
    var email_from = document.getElementById('email_from').value;
    email_from = String(email_from);
   
    var email = document.getElementById('email').value;
    email = String(email);
	var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (pattern.test(email)) {
	    
	    var d = new Date();
	    d = String(d);

	    var subject = "Links browsed by "+user+" on :" + d;

	    $.ajax({
	  		type: "POST",
			  url: "https://mandrillapp.com/api/1.0/messages/send.json",
			  data: {
			    'key': '_G97b4x1hGzqM7C7NsmuvQ',
			    'message': {
			      'from_email': email_from,
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
			   console.log(response); 
			 });

	} else {
        alert('Bad email address: ' + email);
        
    }	 
});
	
}