$(document).ready(function() {
    $("#submit").click(function(event){
        event.preventDefault();

        var ValidEmail = $('#username').val();
        var ValidPassword = $('#password').val();

        if (ValidEmail == 'admin' && ValidPassword == 'admin') { 
            window.location.assign("./navigation/admin/index.html");
        } else if (ValidEmail == 'lecturer' && ValidPassword == 'lecturer') { 
            window.location.assign("./navigation/lecturer/index.html");
        } else if (ValidEmail == 'student' && ValidPassword == 'student') { 
            window.location.assign("./navigation/student/index.html");
        }
        else {
            $('.error').css('display', 'block');
        }
    });
});