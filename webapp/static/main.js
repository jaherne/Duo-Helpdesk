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
                //$("#result").empty();
                var table = document.getElementById("result");

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
				table.appendChild(tr);
							            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});