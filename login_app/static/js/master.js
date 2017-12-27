
document.getElementById('btnsubmit').onclick = function() {
    getdata();
}

function getdata() {

    // store the data of input
    txtusername = document.getElementById('username').value;
    txtpassword = document.getElementById('password').value;

    // Quick validation
    if (txtusername == "" || txtpassword == "") {
        window.alert("Username or password is empty");
        return;
    } else {
        document.getElementById('form_login').submit();
    }
}