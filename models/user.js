exports.User = function User(userId, givenName, lastName, emailAddress, password, role) {
    this.userId = userId;
    this.givenName = givenName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.password = password;
    this.role = role;

    this.setUserId = function(userIdData) {
        userId = userIdData;
    }
    this.setUserId = function() {
        return userId;
    }

    this.setPassword = function(passwordData) {
        password = passwordData;
    }
    this.getPassword = function() {
        return password;
    }

    this.setGivenName = function(givenNameData) {
        givenName = givenNameData;
    }
    this.getGivenName = function() {
        return givenName;
    }

    this.setLastName = function(lastNameData) {
        lastName = lastNameData;
    }
    this.getLastName = function() {
        return lastName;
    }

    this.setEmailAddress = function(emailAddressData) {
        emailAddress = emailAddressData;
    }
    this.getEmailAddress = function() {
        return emailAddress;
    }

    this.setRole = function(roleData) {
        role = roleData;
    }
    this.getRole = function() {
        return role;
    }

};