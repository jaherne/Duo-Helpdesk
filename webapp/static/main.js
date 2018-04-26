function addRow(name, methods, device) {
	var table = document.getElementById("result");
	var newRow = table.insertRow();
	
	var nameCell = newRow.insertCell();
	var methodsCell = newRow.insertCell();
	var statusCell = newRow.insertCell();

	var uname = document.getElementById("username").value;
	console.log(uname);

	var nameText = document.createTextNode(name);
	nameCell.appendChild(nameText);
	var method; 
	for (method=0; method < methods.length; method++) {

		var a = document.createElement('a');
		a.href = "/auth?method=" + methods[method] + "&uname=" + uname + "&device=" + device;
		a.title = methods[method];
		a.id="auth";
		a.appendChild(document.createTextNode(methods[method]));
		methodsCell.appendChild(a);
		methodsCell.appendChild(document.createTextNode(" "));
	}
	statusCell.id="status";
	$('.table').show();
}

document.addEventListener("click", authListener);

$(function() {
	console.log("In function")
    $("#submit").click(function() {
    	event.preventDefault();
        $.ajax({
            url: '/preauth',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);

                var index;

                for (index=0; index < response.length; index++) {
                	var name = response[index].display_name;
                	var methods = response[index].capabilities;
                	var device = response[index].device;

                	addRow(name, methods, device)
                }
			},
            error: function(error) {
                console.log(error);
            }
        });
    });
});

function authListener(event){
    var element = event.target;
    if(element.tagName == 'A' && element.id == "auth") {
    	console.log("In auth function");
    	event.preventDefault();
    	$.ajax({
    		url: element.href,
    		type: 'GET',
    		success: function(response) {
    			console.log(response.result);
    			var td = document.getElementById('status');

    			if (response.result == "allow") {
					td.appendChild(document.createTextNode("Success"));
    			} else {
    				td.appendChild(document.createTextNode("Denied"));
    			}
    		},

    		error: function(error) {
    			console.log("errored");
    		}
    	});
    }	
}