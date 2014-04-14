document.getElementById("btn_save").addEventListener("click",RetrievePages);

function RetrievePages(){
	window.alert("Hi - from inside the function");
	var fourmTabs = new Array();
	chrome.tabs.query({}, function (tabs) {
	    for (var i = 0; i < tabs.length; i++) {
	        fourmTabs[i] = tabs[i].url;
	    }
	    
	    var links = new String();
	    for (var i = 0; i < fourmTabs.length; i++) {
	        if (fourmTabs[i] != null)
	        	{
	        		console.log(fourmTabs[i]);
	        		links += String(fourmTabs[i]);
	        		links += ""
	        		
	        	}
	        else {
	           console.log("??" + i);
	        }
    }
});
	
}