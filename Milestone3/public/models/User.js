

var User = function(UserID, FirstName, LastName, EmailAddress, Country) {
    this.UserID = UserID;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.EmailAddress = EmailAddress;
    this.Country = Country;

    // this.details = function() {
    //     return this.firstName + " " + this.lastName;
    // };
  }



  module.exports = User;

