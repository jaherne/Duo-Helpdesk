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
                	var method; 
                	var uname = $('form');

                	for (method=0; method < methods.length; method++) {
                		console.log(methods[method]);
                	}
                	
                }
                //$("#result").empty();
                /*var result = document.getElementById("result");

				var tr = document.createElement("tr");
				var td = document.createElement("td");
				var td1 = document.createElement("td");
				var txt = document.createTextNode(response);
				var txt1 = document.createTextNode("test");
				var a = document.createElement('a');
				a.appendChild(txt1);
				a.title = "test";
				a.href = "/auth?method=auto&uname=jaherne";
				
				td.appendChild(txt);
				td1.appendChild(a);
				tr.appendChild(td);
				tr.appendChild(td1);
				result.appendChild(tr);
				$('.table').show();*/
							            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});