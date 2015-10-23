CompanyList = new Mongo.Collection("companies");

EventList = new Mongo.Collection("events");


Router.configure({
    layoutTemplate: 'main'
});

if (Meteor.isClient) {
    Meteor.subscribe('theCompanies');
    Meteor.subscribe('theEvents');
    Meteor.subscribe('userList');
    Template.login.events({
        'submit form': function (event) {
            event.preventDefault();
            var usernameVar = event.target.loginUsername.value;
            var passwordVar = event.target.loginPassword.value;
            Meteor.loginWithPassword(usernameVar, passwordVar, function (error) {
                if (error) {
                    alert(error.reason);
                } else {
                    if (usernameVar == 'admin') {
                        Router.go('/companies');
                    }
                    else if (usernameVar == 'supplier') {
                        Router.go('/companies/newCompany')
                    }
                    else if (usernameVar == 'employee') {
                        Router.go('/events');
                    }
                }
            });
        }
    }),
        Template.register.events({
            'submit form': function () {
                event.preventDefault();
                var username = $('[name = username]').val();
                var password = $('[name= password]').val();
                Accounts.createUser({
                        username: username,
                        password: password,
                        roles: 'admin'
                    },
                    function (error) {
                        if (error) {
                            console.log(error.reason);
                        } else {
                            Router.go('home');
                        }
                    });
            }

        }),
        Template.navigation.events({
            'click .logout': function () {
                event.preventDefault();
                Meteor.logout();
                Router.go('login');
            }
        }),
        Template.companies.events({
            'click .btn-warning': function () {
                emailArray = ['gwfreak01@gmail.com'];
                Meteor.call('sendEmail',
                    document.getElementById("emailInvite").value,
                    'sms@tandlautomatics.com',
                    'sms@tandlautomatics.com',
                    'T&L Automatics Supplier Management System Invitation');
                alert("Invitation Sent");
            }
        }),
        Template.companies.helpers({
            'redirect': function () {
                if (Meteor.userId == null) {
                    return Router.go("/");
                }
            }
        }),
        Template.companyListDisplay.events({
            'click .company': function () {
                var companyID = this._id;
                if (companyID == null) {
                    Router.go("/companies");
                }
                else {
                    Router.go("/companies/details/" + this._id);
                    Session.set('selectedCompany', companyID);
                }
            },
            'click .btn-danger': function () {
                var selectedCompany = Session.get('selectedCompany');
                var confirm = window.confirm("Delete this Company?");
                if (confirm) {
                    Meteor.call('removeCompanyData', selectedCompany);
                }
            },
            'keyup [name=companyItem]': function (event) {
                var documentID = this._id;
                var companyItem = event.target.value;
                var companyType = document;
                console.log(event.target.id);
                if ((event.which == 13) || (event.which == 27)) {
                    $(event.target).blur();
                }
                if (event.target.id == "companyName") {
                    Meteor.call('updateCompanyName', documentID, companyItem);
                }
                if (event.target.id == "companyAddress") {
                    Meteor.call('updateCompanyAddress', documentID, companyItem);
                }
                if (event.target.id == "salesName") {
                    Meteor.call('updateSalesName', documentID, companyItem);
                }
                if (event.target.id == "salesEmail") {
                    Meteor.call('updateSalesEmail', documentID, companyItem);
                }
                if (event.target.id == "salesPhone") {
                    Meteor.call('updateSalesPhone', documentID, companyItem);
                }
                if (event.target.id == "qualityName") {
                    Meteor.call('updateQualityName', documentID, companyItem);
                }
                if (event.target.id == "qualityEmail") {
                    Meteor.call('updateQualityEmail', documentID, companyItem);
                }
                if (event.target.id == "qualityPhone") {
                    Meteor.call('updateQualityPhone', documentID, companyItem);
                }
                if (event.target.id == "logisticsName") {
                    Meteor.call('updateSalesName', documentID, companyItem);
                }
                if (event.target.id == "logisticsEmail") {
                    Meteor.call('updateSalesEmail', documentID, companyItem);
                }
                if (event.target.id == "logisticsPhone") {
                    Meteor.call('updateSalesPhone', documentID, companyItem);
                }
                if (event.target.id == "differentName") {
                    Meteor.call('updateQualityName', documentID, companyItem);
                }
                if (event.target.id == "differentEmail") {
                    Meteor.call('updateQualityEmail', documentID, companyItem);
                }
                if (event.target.id == "differentPhone") {
                    Meteor.call('updateQualityPhone', documentID, companyItem);
                }
            }
        }),
        Template.companyListDisplay.helpers({
            'company': function () {
                return CompanyList.find({}, {sort: {companyName: 1}});
            },
            'selectedClass': function () {
                var companyID = this._id;
                var selectedCompany = Session.get('selectedCompany');
                if (companyID == selectedCompany) {
                    return "selected";
                }
            },
            'showSelectedCompany': function () {
                var selectedCompany = Session.get('selectedCompany');
                return CompanyList.findOne(selectedCompany);
            }
        }),
        Template.addCompanyForm.events({
            'submit form': function () {
                event.preventDefault();
                var companyNameVar = event.target.companyName.value;
                var companyAddressVar = event.target.companyAddress.value;

                var salesNameVar = event.target.salesName.value;
                var salesEmailVar = event.target.salesEmail.value;
                var salesPhoneVar = event.target.salesPhone.value;

                var qualityNameVar = event.target.qualityName.value;
                var qualityEmailVar = event.target.qualityEmail.value;
                var qualityPhoneVar = event.target.qualityPhone.value;

                var logisticsNameVar = event.target.logisticsName.value;
                var logisticsEmailVar = event.target.logisticsEmail.value;
                var logisticsPhoneVar = event.target.logisticsPhone.value;

                var differentNameVar = event.target.differentName.value;
                var differentEmailVar = event.target.differentEmail.value;
                var differentPhoneVar = event.target.differentPhone.value;

                var describeInputVar = event.target.describeInput.value;
                var currentUserID = Meteor.userId();

                if (Session.get('showPullDown1') == true) {
                    var expirationDate1Var = event.target.expirationDate1.value;
                    var certNumber1Var = event.target.certNumber1.value;
                    var registrar1Var = event.target.registrar1.value;
                    var cert1StatusVar = true;
                }
                if (Session.get('showPullDown2') == true) {
                    var expirationDate2Var = event.target.expirationDate2.value;
                    var certNumber2Var = event.target.certNumber2.value;
                    var registrar2Var = event.target.registrar2.value;
                    var cert2StatusVar = true;
                }
                if (Session.get('showPullDown3') == true) {
                    var expirationDate3Var = event.target.expirationDate3.value;
                    var certNumber3Var = event.target.certNumber3.value;
                    var registrar3Var = event.target.registrar3.value;
                    var cert3StatusVar = true;
                }
                if (Session.get('showPullDown4') == true) {
                    var certType4Var = event.target.certType4.value;
                    var expirationDate4Var = event.target.expirationDate4.value;
                    var certNumber4Var = event.target.certNumber4.value;
                    var registrar4Var = event.target.registrar4.value;
                    var cert4StatusVar = true;
                }
                if (Session.get('showPullDown5') == true) {
                    var cert5TextVar = event.target.cert5Text.value;
                    var cert5StatusVar = true;
                }
                if ((companyNameVar != "") && (companyAddressVar != "") && (salesNameVar != "") && (salesEmailVar != "")
                    && (salesPhoneVar != "") && (qualityNameVar != "") && (qualityEmailVar != "") && (qualityPhoneVar != "")
                    && (logisticsNameVar != "") && (logisticsEmailVar != "") && (logisticsPhoneVar != "") && (describeInputVar != "")) {
                    if (CompanyList.find({companyName: companyNameVar}).count() == 0) {
                        if (Session.get('showPullDown1') == true) {
                            if ((expirationDate1Var != "") && (certNumber1Var != "") && (registrar1Var != "")) {
                                Meteor.call('insertCompanyData', companyNameVar, companyAddressVar, salesNameVar, salesEmailVar,
                                    salesPhoneVar, qualityNameVar, qualityEmailVar, qualityPhoneVar, logisticsNameVar, logisticsEmailVar,
                                    logisticsPhoneVar, differentNameVar, differentEmailVar, differentPhoneVar, describeInputVar,
                                    expirationDate1Var, certNumber1Var, registrar1Var, cert1StatusVar, expirationDate2Var, certNumber2Var, registrar2Var, cert2StatusVar,
                                    expirationDate3Var, certNumber3Var, registrar3Var, cert3StatusVar, certType4Var, expirationDate4Var, certNumber4Var, registrar4Var, cert4StatusVar,
                                    cert5TextVar, cert5StatusVar);
                                alert("You have successfully registered!");
                                Router.go('companies');
                            }
                            else {
                                alert("Please complete the form");
                            }
                        }
                        else if (Session.get('showPullDown2') == true) {
                            if ((expirationDate2Var != "") && (certNumber2Var != "") && (registrar2Var != "")) {
                                Meteor.call('insertCompanyData', companyNameVar, companyAddressVar, salesNameVar, salesEmailVar,
                                    salesPhoneVar, qualityNameVar, qualityEmailVar, qualityPhoneVar, logisticsNameVar, logisticsEmailVar,
                                    logisticsPhoneVar, differentNameVar, differentEmailVar, differentPhoneVar, describeInputVar,
                                    expirationDate1Var, certNumber1Var, registrar1Var, cert1StatusVar, expirationDate2Var, certNumber2Var, registrar2Var, cert2StatusVar,
                                    expirationDate3Var, certNumber3Var, registrar3Var, cert3StatusVar, certType4Var, expirationDate4Var, certNumber4Var, registrar4Var, cert4StatusVar,
                                    cert5TextVar, cert5StatusVar);
                                alert("You have successfully registered!");
                                Router.go('companies');
                            }
                            else {
                                alert("Please complete the form");
                            }
                        }
                        else if (Session.get('showPullDown3') == true) {
                            if ((expirationDate3Var != "") && (certNumber3Var != "") && (registrar3Var != "")) {
                                Meteor.call('insertCompanyData', companyNameVar, companyAddressVar, salesNameVar, salesEmailVar,
                                    salesPhoneVar, qualityNameVar, qualityEmailVar, qualityPhoneVar, logisticsNameVar, logisticsEmailVar,
                                    logisticsPhoneVar, differentNameVar, differentEmailVar, differentPhoneVar, describeInputVar,
                                    expirationDate1Var, certNumber1Var, registrar1Var, cert1StatusVar, expirationDate2Var, certNumber2Var, registrar2Var, cert2StatusVar,
                                    expirationDate3Var, certNumber3Var, registrar3Var, cert3StatusVar, certType4Var, expirationDate4Var, certNumber4Var, registrar4Var, cert4StatusVar,
                                    cert5TextVar, cert5StatusVar);
                                alert("You have successfully registered!");
                                Router.go('companies');
                            }
                            else {
                                alert("Please complete the form");
                            }
                        }
                        else if (Session.get('showPullDown4') == true) {
                            if ((expirationDate4Var != "") && (certNumber4Var != "") && (registrar4Var != "")) {
                                Meteor.call('insertCompanyData', companyNameVar, companyAddressVar, salesNameVar, salesEmailVar,
                                    salesPhoneVar, qualityNameVar, qualityEmailVar, qualityPhoneVar, logisticsNameVar, logisticsEmailVar,
                                    logisticsPhoneVar, differentNameVar, differentEmailVar, differentPhoneVar, describeInputVar,
                                    expirationDate1Var, certNumber1Var, registrar1Var, cert1StatusVar, expirationDate2Var, certNumber2Var, registrar2Var, cert2StatusVar,
                                    expirationDate3Var, certNumber3Var, registrar3Var, cert3StatusVar, certType4Var, expirationDate4Var, certNumber4Var, registrar4Var, cert4StatusVar,
                                    cert5TextVar, cert5StatusVar);
                                alert("You have successfully registered!");
                                Router.go('companies');
                            }
                            else {
                                alert("Please complete the form");
                            }
                        }
                        else if (Session.get('showPullDown5') == true) {
                            if (cert5TextVar != "") {
                                Meteor.call('insertCompanyData', companyNameVar, companyAddressVar, salesNameVar, salesEmailVar,
                                    salesPhoneVar, qualityNameVar, qualityEmailVar, qualityPhoneVar, logisticsNameVar, logisticsEmailVar,
                                    logisticsPhoneVar, differentNameVar, differentEmailVar, differentPhoneVar, describeInputVar,
                                    expirationDate1Var, certNumber1Var, registrar1Var, cert1StatusVar, expirationDate2Var, certNumber2Var, registrar2Var, cert2StatusVar,
                                    expirationDate3Var, certNumber3Var, registrar3Var, cert3StatusVar, certType4Var, expirationDate4Var, certNumber4Var, registrar4Var, cert4StatusVar,
                                    cert5TextVar, cert5StatusVar);
                                alert("You have successfully registered!");
                                Router.go('companies');
                            }
                            else {
                                alert("Please complete the form");
                            }
                        }
                        else {
                            alert("Please complete the form");
                        }
                    }
                    else {
                        alert("Company already exists!");
                    }


                }
                else {
                    alert("Please complete the form");
                }


            },
            'click .show-Option1': function () {
                Session.set('showPullDown1', event.target.checked);
            },
            'click .show-Option2': function () {
                Session.set('showPullDown2', event.target.checked);
            },
            'click .show-Option3': function () {
                Session.set('showPullDown3', event.target.checked);
            },
            'click .show-Option4': function () {
                Session.set('showPullDown4', event.target.checked);
            },
            'click .show-Option5': function () {
                Session.set('showPullDown5', event.target.checked);
            }
        }),
        Template.addCompanyForm.helpers({
            'showOption1': function () {
                return Session.get("showPullDown1");
            },
            'showOption2': function () {
                return Session.get("showPullDown2");
            },
            'showOption3': function () {
                return Session.get("showPullDown3");
            },
            'showOption4': function () {
                return Session.get("showPullDown4");
            },
            'showOption5': function () {
                return Session.get("showPullDown5");
            }
        }),
        Template.detailCompany.events({}),
        Template.detailCompany.helpers({
            'showOption1': function () {
                if (CompanyList.find({_id: this._id}).fetch()[0].cert[0].certStatus == true) {
                    return true;
                }
            },
            'showOption2': function () {
                if (CompanyList.find({_id: this._id}).fetch()[0].cert[1].certStatus == true) {
                    return true;
                }
            },
            'showOption3': function () {
                if (CompanyList.find({_id: this._id}).fetch()[0].cert[2].certStatus == true) {
                    return true;
                }
            },
            'showOption4': function () {
                if (CompanyList.find({_id: this._id}).fetch()[0].cert[3].certStatus == true) {
                    return true;
                }
            },
            'showOption5': function () {
                if (CompanyList.find({_id: this._id}).fetch()[0].cert[4].certStatus == true) {
                    return true;
                }
            },
            'expirationDate1': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].expirationDate;
            },
            'expirationDate2': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[1].expirationDate;
            },
            'expirationDate3': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[2].expirationDate;
            },
            'expirationDate4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].expirationDate;
            },
            'expirationDate5': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].expirationDate;
            },
            'certNumber1': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].certNumber;
            },
            'certNumber2': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[1].certNumber;
            },
            'certNumber3': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[2].certNumber;
            },
            'certNumber4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].certNumber;
            },
            'registrar1': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].registrar;
            },
            'registrar2': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[1].registrar;
            },
            'registrar3': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[2].registrar;
            },
            'registrar4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].registrar;
            },
            'certType4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].type;
            },
            'cert5Text': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[4].text;
            },
            'different': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].differentName != "";

            },
            'event': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].event;
            }

        }),
        Template.editCompany.events({
            'keyup [name=companyItem], change [name=companyItem]': function (event) {
                var documentID = this._id;
                var companyItem = event.target.value;
                var companyType = document;
                console.log(event.target.id);
                if ((event.which == 13) || (event.which == 27)) {
                    $(event.target).blur();
                }
                if (event.target.id == "companyName") {
                    Meteor.call('updateCompanyName', documentID, companyItem);
                }
                if (event.target.id == "companyAddress") {
                    Meteor.call('updateCompanyAddress', documentID, companyItem);
                }
                if (event.target.id == "salesName") {
                    Meteor.call('updateSalesName', documentID, companyItem);
                }
                if (event.target.id == "salesEmail") {
                    Meteor.call('updateSalesEmail', documentID, companyItem);
                }
                if (event.target.id == "salesPhone") {
                    Meteor.call('updateSalesPhone', documentID, companyItem);
                }
                if (event.target.id == "qualityName") {
                    Meteor.call('updateQualityName', documentID, companyItem);
                }
                if (event.target.id == "qualityEmail") {
                    Meteor.call('updateQualityEmail', documentID, companyItem);
                }
                if (event.target.id == "qualityPhone") {
                    Meteor.call('updateQualityPhone', documentID, companyItem);
                }
                if (event.target.id == "logisticsName") {
                    Meteor.call('updateSalesName', documentID, companyItem);
                }
                if (event.target.id == "logisticsEmail") {
                    Meteor.call('updateSalesEmail', documentID, companyItem);
                }
                if (event.target.id == "logisticsPhone") {
                    Meteor.call('updateSalesPhone', documentID, companyItem);
                }
                if (event.target.id == "differentName") {
                    Meteor.call('updateQualityName', documentID, companyItem);
                }
                if (event.target.id == "differentEmail") {
                    Meteor.call('updateQualityEmail', documentID, companyItem);
                }
                if (event.target.id == "differentPhone") {
                    Meteor.call('updateQualityPhone', documentID, companyItem);
                }
                if (event.target.id == "describeInput") {
                    Meteor.call('updateDescribeInput', documentID, companyItem);
                }
                if (event.target.id == "expirationDate1") {
                    Meteor.call('updateExpirationDate1', documentID, companyItem);
                }
                if (event.target.id == "certNumber1") {
                    Meteor.call('updateCertNumber1', documentID, companyItem);
                }
                if (event.target.id == "registrar1") {
                    Meteor.call('updateRegistrar1', documentID, companyItem);
                }
                if (event.target.id == "expirationDate2") {
                    Meteor.call('updateExpirationDate2', documentID, companyItem);
                }
                if (event.target.id == "certNumber2") {
                    Meteor.call('updateCertNumber2', documentID, companyItem);
                }
                if (event.target.id == "registrar2") {
                    Meteor.call('updateRegistrar2', documentID, companyItem);
                }
                if (event.target.id == "expirationDate3") {
                    Meteor.call('updateExpirationDate3', documentID, companyItem);
                }
                if (event.target.id == "certNumber3") {
                    Meteor.call('updateCertNumber3', documentID, companyItem);
                }
                if (event.target.id == "registrar3") {
                    Meteor.call('updateRegistrar3', documentID, companyItem);
                }
                if (event.target.id == "certType4") {
                    Meteor.call('updateCertType4', documentID, companyItem);
                }
                if (event.target.id == "expirationDate4") {
                    Meteor.call('updateExpirationDate4', documentID, companyItem);
                }
                if (event.target.id == "certNumber4") {
                    Meteor.call('updateCertNumber4', documentID, companyItem);
                }
                if (event.target.id == "registrar4") {
                    Meteor.call('updateRegistrar4', documentID, companyItem);
                }
                if (event.target.id == "cert5Text") {
                    Meteor.call('updateCert5Text', documentID, companyItem);
                }
            },
            'click .show-Option1': function () {
                var documentID = this._id;
                Session.set('showPullDown1', event.target.checked);
                if (Session.get("showPullDown1") == false) {
                    Meteor.call('updateExpirationDate1', documentID, null);
                    Meteor.call('updateCertNumber1', documentID, null);
                    Meteor.call('updateRegistrar1', documentID, null);
                    Meteor.call('updateCertStatus1', documentID, false);
                }
                else {
                    Meteor.call('updateCertStatus1', documentID, true);
                }
            },
            'click .show-Option2': function () {
                var documentID = this._id;
                Session.set('showPullDown2', event.target.checked);
                if (Session.get("showPullDown2") == false) {
                    Meteor.call('updateExpirationDate2', documentID, null);
                    Meteor.call('updateCertNumber2', documentID, null);
                    Meteor.call('updateRegistrar2', documentID, null);
                    Meteor.call('updateCertStatus2', documentID, false);
                }
                else {
                    Meteor.call('updateCertStatus2', documentID, true);
                }
            },
            'click .show-Option3': function () {
                var documentID = this._id;
                Session.set('showPullDown3', event.target.checked);
                if (Session.get("showPullDown3") == false) {
                    Meteor.call('updateExpirationDate3', documentID, null);
                    Meteor.call('updateCertNumber3', documentID, null);
                    Meteor.call('updateRegistrar3', documentID, null);
                    Meteor.call('updateCertStatus3', documentID, false);
                }
                else {
                    Meteor.call('updateCertStatus3', documentID, true);
                }
            },
            'click .show-Option4': function () {
                var documentID = this._id;
                Session.set('showPullDown4', event.target.checked);
                if (Session.get("showPullDown4") == false) {
                    Meteor.call('updateCertType4', documentID, null);
                    Meteor.call('updateExpirationDate4', documentID, null);
                    Meteor.call('updateCertNumber4', documentID, null);
                    Meteor.call('updateRegistrar4', documentID, null);
                    Meteor.call('updateCertStatus4', documentID, false);
                }
                else {
                    Meteor.call('updateCertStatus4', documentID, true);
                }
            },
            'click .show-Option5': function () {
                var documentID = this._id;
                Session.set('showPullDown5', event.target.checked);
                if (Session.get("showPullDown5") == false) {
                    Meteor.call('updateCert5Text', documentID, null);
                    Meteor.call('updateCertStatus5', documentID, false);
                }
                else {
                    Meteor.call('updateCertStatus5', documentID, true);
                }
            }
        }),
        Template.editCompany.helpers({
            'showOption1': function () {
                if ((CompanyList.find({_id: this._id}).fetch()[0].cert[0].certStatus == true) || Session.get("showPullDown1")) {
                    if (Session.get("showPullDown1") == false) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }

            },
            'showOption2': function () {
                if ((CompanyList.find({_id: this._id}).fetch()[0].cert[1].certStatus == true) || Session.get("showPullDown2")) {
                    return Session.get("showPullDown2");
                }
            },
            'showOption3': function () {
                if ((CompanyList.find({_id: this._id}).fetch()[0].cert[2].certStatus == true) || Session.get("showPullDown3")) {
                    return Session.get("showPullDown3");
                }
            },
            'showOption4': function () {
                if ((CompanyList.find({_id: this._id}).fetch()[0].cert[3].certStatus == true) || Session.get("showPullDown4")) {
                    return Session.get("showPullDown4");
                }
            },
            'showOption5': function () {
                if ((CompanyList.find({_id: this._id}).fetch()[0].cert[4].certStatus == true) || Session.get("showPullDown5")) {
                    return Session.get("showPullDown5");
                }
            },
            'expirationDate1': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].expirationDate;
            },
            'expirationDate2': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[1].expirationDate;
            },
            'expirationDate3': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[2].expirationDate;
            },
            'expirationDate4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].expirationDate;
            },
            'expirationDate5': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].expirationDate;
            },
            'certNumber1': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].certNumber;
            },
            'certNumber2': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[1].certNumber;
            },
            'certNumber3': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[2].certNumber;
            },
            'certNumber4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].certNumber;
            },
            'registrar1': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[0].registrar;
            },
            'registrar2': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[1].registrar;
            },
            'registrar3': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[2].registrar;
            },
            'registrar4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].registrar;
            },
            'certType4': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[3].type;
            },
            'cert5Text': function () {
                return CompanyList.find({_id: this._id}).fetch()[0].cert[4].text;
            }

        }),
        Template.eventListDisplay.events({
            'click .event': function () {
                var eventID = this._id;
                Router.go("/events/details/" + this._id);
                Session.set('selectedEvent', eventID);
            },
            'click .btn-danger': function (event) {
                var selectedEvent = Session.get('selectedEvent');
                var confirm = window.confirm("Delete this Event?");
                if (confirm) {
                    Meteor.call('removeEventData', selectedEvent);
                }
            }
        }),
        Template.eventListDisplay.helpers({
            'event': function () {
                return EventList.find({}, {sort: {eventDate: 1}}).map(function (document, index) {
                    document.index = index + 1;
                    return document;
                });
            },
            'selectedClass': function () {
                var eventID = this._id;
                var selectedEvent = Session.get('selectedEvent');
                if (eventID == selectedEvent) {
                    return "selected";
                }
            },
            'showSelectedEvent': function () {
                var selectedEvent = Session.get('selectedEvent');
                return EventList.findOne(selectedEvent);
            }
        }),
        Template.addEventForm.events({
            'change #eventType': function (event, template) {
                var eventTypeVar = document.getElementById("eventType").value;
                if (eventTypeVar == "Delivery") {
                    Session.set('showDelivery', true);
                }
                else {
                    Session.set('showDelivery', false);
                }
            },
            'submit form': function () {
                event.preventDefault();

                var currentUserID = Meteor.userId();
                var companyNameVar = document.getElementById("companySelect").value;
                var eventDateVar = event.target.eventDate.value;
                var eventTypeVar = document.getElementById("eventType").value;
                var tlPartNumberVar = event.target.tlPartNumber.value;
                var purchaseOrderVar = event.target.purchaseOrder.value;
                var lotNumberVar = event.target.lotNumber.value;
                var carNumberVar = event.target.carNumber.value;
                var rootCauseVar = event.target.rootCause.value;
                var statusOptionVar = document.getElementById("statusOption").value;

                if (eventTypeVar == "Delivery") {
                    var requiredDeliveryDateVar = document.getElementById("requiredDeliveryDate").value;
                    var actualDeliveryDateVar = document.getElementById("actualDeliveryDate").value;
                    if ((eventDateVar != "") && (tlPartNumberVar != "") && (purchaseOrderVar != "") && (lotNumberVar != "") && (carNumberVar != "")) {
                        if ((requiredDeliveryDateVar != "") && (actualDeliveryDateVar != "")) {
                            Meteor.call('insertEventData', companyNameVar, eventDateVar, eventTypeVar, tlPartNumberVar, purchaseOrderVar, lotNumberVar, carNumberVar, null, requiredDeliveryDateVar, actualDeliveryDateVar, rootCauseVar, statusOptionVar);
                            alert("Successfully Added Event");
                            Router.go('events');
                        }
                    }
                    else {
                        alert("Please complete the form")
                    }
                }

                else if (eventTypeVar == "Quality") {
                    var quantityRejectVar = document.getElementById("quantityReject").value;
                    if ((eventDateVar != "") && (tlPartNumberVar != "") && (purchaseOrderVar != "") && (lotNumberVar != "") && (carNumberVar != "")) {
                        if (quantityRejectVar != "") {
                            Meteor.call('insertEventData', companyNameVar, eventDateVar, eventTypeVar, tlPartNumberVar, purchaseOrderVar, lotNumberVar, carNumberVar, quantityRejectVar, null, null, rootCauseVar, statusOptionVar);
                            alert("Successfully Added Event");
                            Router.go('events');
                        }
                    }
                    else {
                        alert("Please complete the form")
                    }
                }
            }
        }),
        Template.addEventForm.helpers({
            'showDelivery': function () {
                var currentUserID = Meteor.userId();
                return Session.get("showDelivery");
            },
            'company': function () {
                return CompanyList.find({}, {sort: {companyName: 1}});
            }
        }),
        Template.detailEvent.events({}),
        Template.detailEvent.helpers({
            'showQuality': function () {
                if (EventList.find({_id: this._id}).fetch()[0].eventType == "Quality") {
                    return true;
                }
            },
            'showDelivery': function () {
                if (EventList.find({_id: this._id}).fetch()[0].eventType == "Delivery") {
                    return true;
                }
            }
        }),
        Template.editEvent.events({
            'change #eventType': function (event, template) {
                var documentID = this._id;
                var eventTypeVar = document.getElementById("eventType").value;
                if (eventTypeVar == "Delivery") {
                    Meteor.call('updateEventType', documentID, "Delivery");
                    Meteor.call('updateQuantityReject', documentID, null);
                }
                else {
                    Meteor.call('updateEventType', documentID, "Quality");
                    Meteor.call('updateRequiredDeliveryDate', documentID, null);
                    Meteor.call('updateActualDeliveryDate', documentID, null);
                }
            },
            'keyup [name=companyItem], change [name=companyItem]': function (event) {
                var documentID = this._id;
                var companyItem = event.target.value;
                var companyType = document;
                console.log(event.target.id);
                if ((event.which == 13) || (event.which == 27)) {
                    $(event.target).blur();
                }
                if (event.target.id == "eventDate") {
                    Meteor.call('updateEventDate', documentID, companyItem);
                }
                if (event.target.id == "tlPartNumber") {
                    Meteor.call('updateTlPartNumber', documentID, companyItem);
                }
                if (event.target.id == "purchaseOrder") {
                    Meteor.call('updatePurchaseOrder', documentID, companyItem);
                }
                if (event.target.id == "lotNumber") {
                    Meteor.call('updateLotNumber', documentID, companyItem);
                }
                if (event.target.id == "carNumber") {
                    Meteor.call('updateCarNumber', documentID, companyItem);
                }
                if (event.target.id == "quantityReject") {
                    Meteor.call('updateQuantityReject', documentID, companyItem);
                }
                if (event.target.id == "requiredDeliveryDate") {
                    Meteor.call('updateRequiredDeliveryDate', documentID, companyItem);
                }
                if (event.target.id == "actualDeliveryDate") {
                    Meteor.call('updateActualDeliveryDate', documentID, companyItem);
                }
                if (event.target.id == "rootCause") {
                    Meteor.call('updateRootCause', documentID, companyItem);
                }
                if (event.target.id == "statusOption") {
                    Meteor.call('updateStatusOption', documentID, companyItem);
                }

            }
        }),
        Template.editEvent.helpers({
            selectData: function (data) {
                if ((data == this.eventType) || (data == this.statusOption)) {
                    return 'selected';
                }
            },
            'showQuality': function () {
                if (EventList.find({_id: this._id}).fetch()[0].eventType == "Quality") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'showDelivery': function () {
                if (EventList.find({_id: this._id}).fetch()[0].eventType == "Delivery") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }),
        Template.main.events({
            'click .logout': function () {
                event.preventDefault();
                Meteor.logout();
                Router.go('/');
            }
        }),
        Template.main.helpers({
            'redirect': function () {
                if (Meteor.userId == null) {
                    return Router.go("/");
                }
            }
        }),
        Template.companyEventListDisplay.helpers({
            'event': function () {
                return CompanyList.find({_id: this._id}, {sort: {eventDate: 1}}).fetch()[0].event.map(function (document, index) {
                    document.index = index + 1;
                    return document;
                });
            }
        }),
        Template.registerEmail.events({}),
        Template.registerEmail.helpers({})

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (!Meteor.users.findOne()) {
            var users = [
                {name: "Admin User", username: "admin", roles: ['admin']},
                {name: "Employee User", username: "employee", roles: ['employee']},
                {name: "Supplier User", username: "supplier", roles: ['supplier']}

            ];

            _.each(users, function (user) {
                var id;
                var pass = "apple1";
                id = Accounts.createUser({
                    username: user.username,
                    password: pass,
                    profile: {name: user.name}
                });
                if (user.roles.length > 0) {
                    // Need _id of existing user record so this call must come
                    // after `Accounts.createUser` or `Accounts.onCreate`
                    if (user.username == "admin") {
                        Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
                    }
                    else {
                        Roles.addUsersToRoles(id, user.roles);
                    }
                }
            });
        }
    });

    Meteor.publish('theCompanies', function () {
        if (Roles.userIsInRole(this.userId, ['admin', 'employee'])) {
            var currentUserID = this.userId;
            return CompanyList.find({});
        }
        else {
            this.stop();
            return;
        }
    });

    Meteor.publish('theEvents', function () {
        if (Roles.userIsInRole(this.userId, ['admin', 'employee'])) {
            var currentUserID = this.userId;
            return EventList.find({});
        }
        else {
            this.stop();
            return;
        }
    });

    Meteor.publish('userList', function () {
        if (Roles.userIsInRole(this.userId, ['admin'])) {
            var currentUserID = this.userId;
            return Meteor.users.find({});
        }
        else {
            this.stop();
            return;
        }
    });

    Meteor.methods({
        'insertCompanyData': function (companyNameVar, companyAddressVar, salesNameVar, salesEmailVar, salesPhoneVar,
                                       qualityNameVar, qualityEmailVar, qualityPhoneVar, logisticsNameVar, logisticsEmailVar,
                                       logisticsPhoneVar, differentNameVar, differentEmailVar, differentPhoneVar, describeInputVar,
                                       expirationDate1Var, certNumber1Var, registrar1Var, cert1StatusVar, expirationDate2Var,
                                       certNumber2Var, registrar2Var, cert2StatusVar, expirationDate3Var, certNumber3Var,
                                       registrar3Var, cert3StatusVar, certType4Var, expirationDate4Var, certNumber4Var,
                                       registrar4Var, cert4StatusVar, cert5TextVar, cert5StatusVar) {
            var currentUserID = Meteor.userId();
            CompanyList.insert({
                companyName: companyNameVar,
                companyAddress: companyAddressVar,
                salesName: salesNameVar,
                salesEmail: salesEmailVar,
                salesPhone: salesPhoneVar,
                qualityName: qualityNameVar,
                qualityEmail: qualityEmailVar,
                qualityPhone: qualityPhoneVar,
                logisticsName: logisticsNameVar,
                logisticsEmail: logisticsEmailVar,
                logisticsPhone: logisticsPhoneVar,
                differentName: differentNameVar,
                differentEmail: differentEmailVar,
                differentPhone: differentPhoneVar,
                describeInput: describeInputVar,
                cert: [{
                    type: "ISO9001",
                    expirationDate: expirationDate1Var,
                    certNumber: certNumber1Var,
                    registrar: registrar1Var,
                    certStatus: cert1StatusVar
                }, {
                    type: "ISO14001",
                    expirationDate: expirationDate2Var,
                    certNumber: certNumber2Var,
                    registrar: registrar2Var,
                    certStatus: cert2StatusVar
                }, {
                    type: "TS16949",
                    expirationDate: expirationDate3Var,
                    certNumber: certNumber3Var,
                    registrar: registrar3Var,
                    certStatus: cert3StatusVar
                }, {
                    type: certType4Var,
                    expirationDate: expirationDate4Var,
                    certNumber: certNumber4Var,
                    registrar: registrar4Var,
                    certStatus: cert4StatusVar
                }, {
                    type: "None",
                    text: cert5TextVar,
                    certStatus: cert5StatusVar
                }],
                event: [],
                createdBy: currentUserID
            });
        },
        'removeCompanyData': function (selectedCompany) {
            var currentUserID = Meteor.userId();
            if (Roles.userIsInRole(currentUserID, 'admin')) {
                CompanyList.remove({_id: selectedCompany});
            }
        },
        'updateCompanyName': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {companyName: companyItem}}, {createdBy: currentUserID});
            console.log("Company Name changed to: " + companyItem);
        },
        'updateCompanyAddress': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {companyAddress: companyItem}}, {createdBy: currentUserID});
            console.log("Company Address changed to: " + companyItem);
        },
        'updateSalesName': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {salesName: companyItem}}, {createdBy: currentUserID});
            console.log("Sales Manager Name changed to: " + companyItem);
        },
        'updateSalesEmail': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {salesEmail: companyItem}}, {createdBy: currentUserID});
            console.log("Sales Manager Email changed to: " + companyItem);
        },
        'updateSalesPhone': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {salesPhone: companyItem}}, {createdBy: currentUserID});
            console.log("Sales Manager Phone changed to: " + companyItem);
        },
        'updateQualityName': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {qualityName: companyItem}}, {createdBy: currentUserID});
            console.log("Quality Manager Name changed to: " + companyItem);
        },
        'updateQualityEmail': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {qualityEmail: companyItem}}, {createdBy: currentUserID});
            console.log("Quality Manager Email changed to: " + companyItem);
        },
        'updateQualityPhone': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {qualityPhone: companyItem}}, {createdBy: currentUserID});
            console.log("Quality Manager Phone changed to: " + companyItem);
        },
        'updateLogisticsName': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {logisticsName: companyItem}}, {createdBy: currentUserID});
            console.log("Logistics Manager Name changed to: " + companyItem);
        },
        'updateLogisticsEmail': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {logisticsEmail: companyItem}}, {createdBy: currentUserID});
            console.log("Logistics Manager Email changed to: " + companyItem);
        },
        'updateLogisticsPhone': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {logisticsPhone: companyItem}}, {createdBy: currentUserID});
            console.log("Logistics Manager Phone changed to: " + companyItem);
        },
        'updateDifferentName': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {differentName: companyItem}}, {createdBy: currentUserID});
            console.log("Other Name changed to: " + companyItem);
        },
        'updateDifferentEmail': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {differentEmail: companyItem}}, {createdBy: currentUserID});
            console.log("Other Email changed to: " + companyItem);
        },
        'updateDifferentPhone': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {differentPhone: companyItem}}, {createdBy: currentUserID});
            console.log("Other Phone changed to: " + companyItem);
        },
        'updateDescribeInput': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {describeInput: companyItem}}, {createdBy: currentUserID});
            console.log("Description changed to: " + companyItem);
        },
        'updateExpirationDate1': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.0.expirationDate": companyItem}}, {createdBy: currentUserID});
            console.log("Expiration Date 1 changed to: " + companyItem);
        },
        'updateCertNumber1': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.0.certNumber": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Number 1 changed to: " + companyItem);
        },
        'updateRegistrar1': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.0.registrar": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Registrar 1 changed to: " + companyItem);
        },
        'updateCertStatus1': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.0.certStatus": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate 1 Status changed to: " + companyItem);
        },
        'updateExpirationDate2': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.1.expirationDate": companyItem}}, {createdBy: currentUserID});
            console.log("Expiration Date 2 changed to: " + companyItem);
        },
        'updateCertNumber2': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.1.certNumber": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Number 2 changed to: " + companyItem);
        },
        'updateRegistrar2': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.1.registrar": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Registrar 2 changed to: " + companyItem);
        },
        'updateCertStatus2': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.1.certStatus": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate 1 Status changed to: " + companyItem);
        },
        'updateExpirationDate3': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.2.expirationDate": companyItem}}, {createdBy: currentUserID});
            console.log("Expiration Date 3 changed to: " + companyItem);
        },
        'updateCertNumber3': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.2.certNumber": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Number 3 changed to: " + companyItem);
        },
        'updateRegistrar3': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.2.registrar": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Registrar 3 changed to: " + companyItem);
        },
        'updateCertStatus3': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.2.certStatus": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate 3 Status changed to: " + companyItem);
        },
        'updateCertType4': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.3.type": companyItem}}, {createdBy: currentUserID});
            console.log("Certification Type 4 changed to: " + companyItem);
        },
        'updateExpirationDate4': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.3.expirationDate": companyItem}}, {createdBy: currentUserID});
            console.log("Expiration Date 4 changed to: " + companyItem);
        },
        'updateCertNumber4': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.3.certNumber": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Number 4 changed to: " + companyItem);
        },
        'updateRegistrar4': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.3.registrar": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate Registrar 4 changed to: " + companyItem);
        },
        'updateCertStatus4': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.3.certStatus": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate 4 Status changed to: " + companyItem);
        },
        'updateCert5Text': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.4.text": companyItem}}, {createdBy: currentUserID});
            console.log("Certification 5 Text changed to: " + companyItem);
        },
        'updateCertStatus5': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            CompanyList.update({_id: documentID}, {$set: {"cert.4.certStatus": companyItem}}, {createdBy: currentUserID});
            console.log("Certificate 5 Status changed to: " + companyItem);
        },
        'insertEventData': function (companyNameVar, eventDateVar, eventTypeVar, tlPartNumberVar, purchaseOrderVar,
                                     lotNumberVar, carNumberVar, quantityRejectVar, requiredDeliveryDateVar, actualDeliveryDateVar,
                                     rootCauseVar, statusOptionVar) {
            var currentUserID = Meteor.userId();
            EventList.insert({
                companyName: companyNameVar,
                eventDate: eventDateVar,
                eventType: eventTypeVar,
                tlPartNumber: tlPartNumberVar,
                purchaseOrder: purchaseOrderVar,
                lotNumber: lotNumberVar,
                carNumber: carNumberVar,
                quantityReject: quantityRejectVar,
                requiredDeliveryDate: requiredDeliveryDateVar,
                actualDeliveryDate: actualDeliveryDateVar,
                rootCause: rootCauseVar,
                statusOption: statusOptionVar,
                createdBy: currentUserID
            });
            CompanyList.update({_id: CompanyList.findOne({companyName: companyNameVar})._id}, {
                $push: {
                    event: {
                        eventDate: eventDateVar,
                        eventType: eventTypeVar,
                        tlPartNumber: tlPartNumberVar,
                        purchaseOrder: purchaseOrderVar,
                        lotNumber: lotNumberVar,
                        carNumber: carNumberVar,
                        quantityReject: quantityRejectVar,
                        requiredDeliveryDate: requiredDeliveryDateVar,
                        actualDeliveryDate: actualDeliveryDateVar,
                        rootCause: rootCauseVar,
                        statusOption: statusOptionVar
                    }
                }
            }, {createdBy: currentUserID})
        },
        'removeEventData': function (selectedEvent) {
            var currentUserID = Meteor.userId();
            if (Roles.userIsInRole(currentUserID, 'admin')) {
                EventList.remove({_id: selectedEvent});
            }
        },
        'updateEventType': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {eventType: companyItem}}, {createdBy: currentUserID});
            console.log("Event Type changed to: " + companyItem);
        },
        'updateEventDate': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {eventDate: companyItem}}, {createdBy: currentUserID});
            console.log("Event Date changed to: " + companyItem);
        },
        'updateTlPartNumber': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {tlPartNumber: companyItem}}, {createdBy: currentUserID});
            console.log("T&L Part Number changed to: " + companyItem);
        },
        'updatePurchaseOrder': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {purchaseOrder: companyItem}}, {createdBy: currentUserID});
            console.log("Purchase Order changed to: " + companyItem);
        },
        'updateLotNumber': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {lotNumber: companyItem}}, {createdBy: currentUserID});
            console.log("Lot Number changed to: " + companyItem);
        },
        'updateQuantityReject': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {quantityReject: companyItem}}, {createdBy: currentUserID});
            console.log("Quantity Reject changed to: " + companyItem);
        },
        'updateRequiredDeliveryDate': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {requiredDeliveryDate: companyItem}}, {createdBy: currentUserID});
            console.log("Required Delivery Date changed to: " + companyItem);
        },
        'updateActualDeliveryDate': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {actualDeliveryDate: companyItem}}, {createdBy: currentUserID});
            console.log("Actual Delivery Date changed to: " + companyItem);
        },
        'updateCarNumber': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {carNumber: companyItem}}, {createdBy: currentUserID});
            console.log("CAR Number changed to: " + companyItem);
        },
        'updateRootCause': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {rootCause: companyItem}}, {createdBy: currentUserID});
            console.log("Root Cause changed to: " + companyItem);
        },
        'updateStatusOption': function (documentID, companyItem) {
            var currentUserID = Meteor.userId();
            EventList.update({_id: documentID}, {$set: {statusOption: companyItem}}, {createdBy: currentUserID});
            console.log("Status changed to: " + companyItem);
        },
        'sendEmail': function (to, from, replyTo, subject) {
            //check([to, from, subject, text], [String]);

            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.

            //this.unblock();
            //to.forEach(function (entry) {
            //    Email.send({
            //        to: entry,
            //        from: from,
            //        replyTo: replyTo,
            //        subject: subject,
            //        html: text
            //    });
            //});

            Email.send({
                from: from,
                to: to,
                subject: subject,
                text: "To Our Valued Suppliers,\n\n" +
                "\tWe have developed a web-based tool that has been " +
                "designed to help us collect supplier profile data and also " +
                "automate performance feedback to our suppliers on a quarterly basis. " +
                "This system will require that you designate a point person to submit " +
                "the information requested and also be the recipient of the quality and " +
                "delivery performance feedback that we will send to your designated staff " +
                "each quarter via email.\n\n" +
                "\tWe ask that you take approximately 5 minutes to fill out the profile " +
                "survey and submit it to us within the next week.  Follow the instructions " +
                "below to access the T&L Supplier site and submit the profile for your company. " +
                "Thank you in advance for your support.\n\n" +
                "\t1.   Go to https://thprcc.meteor.com\n" +
                "\t2.   Enter the login information given below\n" +
                "\t\ta.	Username: supplier\n" +
                "\t\tb.	Password: apple1\n" +
                "\t3.   Fill out the profile survey\n" +
                "\t4.	Click the Submit Button\n\n" +
                "Once you have registered, your company will be able to receive quarterly performance feedback.\n\n" +
                "Sincerely,\n" +
                "Bill Green\n" +
                "Vice President"

            });
        }

    });

    //Accounts.onCreateUser(function (options, user) {
    //    if (user.roles == null) {
    //        Roles.addUsersToRoles(user, 'supplier');
    //    }
    //});
}


Router.route('/login');

Router.route('/register', {
    template: 'addCompanyForm'
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/newCompanyRegistration', {
    template: 'addCompanyForm'
});

Router.route('/companies', {
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("theCompanies");
    }
});

Router.route('/companies/newCompany', {
    template: 'addCompanyForm'
});

Router.route('/companies/details/:_id', {
    template: 'detailCompany',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("theCompanies");
    },
    data: function () {
        var currentList = this.params._id;
        return CompanyList.findOne({_id: currentList});
    }
});

Router.route('/companies/edit/:_id', {
    template: 'editCompany',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("theCompanies");
    },
    data: function () {
        var currentList = this.params._id;
        return CompanyList.findOne({_id: currentList});
    }
});

Router.route('/events', {
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("theEvents");
    }
});

Router.route('/events/newEvent', {
    template: 'addEventForm'
});

Router.route('/events/details/:_id', {
    template: 'detailEvent',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("theEvents");
    },
    data: function () {
        var currentList = this.params._id;
        return EventList.findOne({_id: currentList});
    }
});

Router.route('/events/edit/:_id', {
    template: 'editEvent',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("theEvents");
    },
    data: function () {
        var currentList = this.params._id;
        return EventList.findOne({_id: currentList});
    }
});

Router.route('/registerCompany');