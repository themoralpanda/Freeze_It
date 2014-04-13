document.getElementById("btn_save").addEventListener("click",RetrievePages);

function RetrievePages(){
	window.alert("Hi - from inside the function");
	var fourmTabs = new Array();
	chrome.tabs.query({}, function (tabs) {
	    for (var i = 0; i < tabs.length; i++) {
	        fourmTabs[i] = tabs[i].url;
	    }
	    
	    for (var i = 0; i < fourmTabs.length; i++) {
	        if (fourmTabs[i] != null)
	        	{
	        		console.log(fourmTabs[i]);
	        		
	        	}
	        else {
	           console.log("??" + i);
	        }
    }
});
	
}