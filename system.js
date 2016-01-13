//Rolling Yearly Cummitalive Events
//Q1'14-Q1'15 -> Q2'14-Q2'15
//Bill, Mark, Dan, Vince - SMS App Icon
//Jan 6 - Finalize Report Function and check on outstanding suppliers not yet registered
//Jan 13 - Roll out final process to T&L Users (Icons on Desktops + Training)

SimpleSchema.debug = true;

CompaniesTest = new Mongo.Collection("companies_Test");

EventsTest = new Mongo.Collection("events_Test");

CompaniesSchema = new SimpleSchema({
    companyName: {
        type: String,
        label: "Company Name",
        unique: true,
        index: true
    },
    companyAddress: {
        type: Object,
        label: "Company Address"
    },
    "companyAddress.street": {
        type: String,
        label: "Street 1"
    },
    "companyAddress.street2": {
        type: String,
        label: "Street 2",
        optional: true
    },
    "companyAddress.city": {
        type: String,
        label: "City"
    },
    "companyAddress.state": {
        type: String,
        autoform: {
            firstOption: "(Select a State)",
            options: function () {
                return [
                    {label: "AL", value: "AL"},
                    {label: "AK", value: "AK"},
                    {label: "AZ", value: "AZ"},
                    {label: "AR", value: "AR"},
                    {label: "CA", value: "CA"},
                    {label: "CO", value: "CO"},
                    {label: "CT", value: "CT"},
                    {label: "DE", value: "DE"},
                    {label: "FL", value: "FL"},
                    {label: "GA", value: "GA"},
                    {label: "HI", value: "HI"},
                    {label: "ID", value: "ID"},
                    {label: "IL", value: "IL"},
                    {label: "IN", value: "IN"},
                    {label: "IA", value: "IA"},
                    {label: "KS", value: "KS"},
                    {label: "KY", value: "KY"},
                    {label: "LA", value: "LA"},
                    {label: "ME", value: "ME"},
                    {label: "MD", value: "MD"},
                    {label: "MA", value: "MA"},
                    {label: "MI", value: "MI"},
                    {label: "MN", value: "MN"},
                    {label: "MS", value: "MS"},
                    {label: "MO", value: "MO"},
                    {label: "MT", value: "MT"},
                    {label: "NE", value: "NE"},
                    {label: "NV", value: "NV"},
                    {label: "NH", value: "NH"},
                    {label: "NJ", value: "NJ"},
                    {label: "NM", value: "NM"},
                    {label: "NY", value: "NY"},
                    {label: "NC", value: "NC"},
                    {label: "ND", value: "ND"},
                    {label: "OH", value: "OH"},
                    {label: "OK", value: "OK"},
                    {label: "OR", value: "OR"},
                    {label: "PA", value: "PA"},
                    {label: "RI", value: "RI"},
                    {label: "SC", value: "SC"},
                    {label: "SD", value: "SD"},
                    {label: "TN", value: "TN"},
                    {label: "TX", value: "TX"},
                    {label: "UT", value: "UT"},
                    {label: "VT", value: "VT"},
                    {label: "VA", value: "VA"},
                    {label: "WA", value: "WA"},
                    {label: "WV", value: "WV"},
                    {label: "WI", value: "WI"},
                    {label: "WY", value: "WY"}
                ];
            }
        }
    },
    "companyAddress.zipcode": {
        type: String,
        label: "ZIP",
        regEx: SimpleSchema.RegEx.ZipCode
    },
    salesPerson: {
        type: Object,
        label: "Sales Manager"
    },
    "salesPerson.name": {
        type: String,
        label: "Name",
        autoform: {
            afFieldInput: {
                placeholder: "First, Last"
            }
        }
    },
    "salesPerson.email": {
        type: String,
        label: "E-Mail",
        regEx: SimpleSchema.RegEx.Email
    },
    "salesPerson.phone": {
        type: String,
        label: "Phone",
        autoform: {
            afFieldInput: {
                placeholder: "XXX-XXX-XXXX"
            }
        }
    },
    "salesPerson.status": {
        type: Boolean,
        label: "Check here for this person to receive the Quarterly Performance Reports",
        defaultValue: false
    },
    qualityPerson: {
        type: Object,
        label: "Quality Manager"
    },
    "qualityPerson.name": {
        type: String,
        label: "Name",
        autoform: {
            afFieldInput: {
                placeholder: "First, Last"
            }
        }
    },
    "qualityPerson.email": {
        type: String,
        label: "E-Mail",
        regEx: SimpleSchema.RegEx.Email
    },
    "qualityPerson.phone": {
        type: String,
        label: "Phone",
        autoform: {
            afFieldInput: {
                placeholder: "XXX-XXX-XXXX"
            }
        }
    },
    "qualityPerson.status": {
        type: Boolean,
        label: "Check here for this person to receive the Quarterly Performance Reports",
        defaultValue: false
    },
    logisticsPerson: {
        type: Object,
        label: "Logistics Manager"
    },
    "logisticsPerson.name": {
        type: String,
        label: "Name",
        autoform: {
            afFieldInput: {
                placeholder: "First, Last"
            }
        }
    },
    "logisticsPerson.email": {
        type: String,
        label: "E-Mail",
        regEx: SimpleSchema.RegEx.Email
    },
    "logisticsPerson.phone": {
        type: String,
        label: "Phone",
        autoform: {
            afFieldInput: {
                placeholder: "XXX-XXX-XXXX"
            }
        }
    },
    "logisticsPerson.status": {
        type: Boolean,
        label: "Check here for this person to receive the Quarterly Performance Reports",
        defaultValue: false
    },
    differentPerson: {
        type: Object,
        label: "Person To Receive Performance Reports If Different Than The 3 People Listed Above",
        optional: true
    },
    "differentPerson.name": {
        type: String,
        label: "Name",
        optional: true,
        autoform: {
            afFieldInput: {
                placeholder: "First, Last"
            }
        }
    },
    "differentPerson.email": {
        type: String,
        label: "E-Mail",
        optional: true,
        regEx: SimpleSchema.RegEx.Email
    },
    "differentPerson.phone": {
        type: String,
        label: "Phone",
        optional: true,
        autoform: {
            afFieldInput: {
                placeholder: "XXX-XXX-XXXX"
            }
        }
    },
    "differentPerson.status": {
        type: Boolean,
        label: "Check here for this person to receive the Quarterly Performance Reports",
        optional: true,
        defaultValue: false,
        autoform: {
            type: function () {
                var docId = (AutoForm.getFieldValue("salesPerson.status") || AutoForm.getFieldValue("qualityPerson.status") || AutoForm.getFieldValue("logisticsPerson.status"));
                if (docId) {
                    return "hidden";
                }

            }
        }
    },
    itemDescription: {
        type: String,
        label: "Describe Product Manufactured/Provided"
    },
    certification: {
        type: [Object],
        minCount: 1,
        maxCount: 5
    },
    "certification.$.certType": {
        type: String,
        label: "Type",
        autoform: {
            afFieldInput: {
                firstOption: "(Select a Certification Type)",
                options: function () {
                    return [
                        {label: "ISO9001", value: "ISO9001"},
                        {label: "ISO14001", value: "ISO14001"},
                        {label: "TS16949", value: "TS16949"},
                        {label: "Other", value: "Other"},
                        {label: "None", value: "None"}
                    ];
                }
            }
        },
        autoValue: function () {
            var type = this.field("certification.0.certType");
            if (type.value != "None") {
                return type.value;
            }
        }
    },
    "certification.$.other": {
        type: String,
        label: "Certification Type",
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                var shouldBeRequired = this.field('certification.0.certType').value;
                if (shouldBeRequired == "Other") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (!this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("certification.0.certType") != "Other") {
                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.field("certification.0.certType");
            var content = this.field("certification.0.other");
            if (type.value != "None") {
                return content.value;
            }
            else {
                this.unset();
            }
        }
    },
    "certification.$.expirationDate": {
        type: Date,
        label: "Expiration Date",
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                var shouldBeRequired = this.field('certification.0.certType').value;
                if (shouldBeRequired != "None") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (!this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("certification.0.certType") == "None") {
                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.field("certification.0.certType");
            var content = this.field("certification.0.expirationDate");
            if (type.value != "None") {
                return content.value;
            }
            else {
                this.unset();
            }
        }

    },
    "certification.$.certNumber": {
        type: String,
        label: "Certificate Number",
        unique: true,
        index: true,
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                var shouldBeRequired = this.field('certification.0.certType').value;
                if (shouldBeRequired != "None") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (!this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("certification.0.certType") == "None") {
                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.field("certification.0.certType");
            var content = this.field("certification.0.certNumber");
            if (type.value != "None") {
                return content.value;
            }
            else {
                this.unset();
            }
        }
    },
    "certification.$.registrar": {
        type: String,
        label: "Registrar Name",
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                var shouldBeRequired = this.field('certification.0.certType').value;
                if (shouldBeRequired != "None") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (!this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("certification.0.certType") == "None") {
                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.field("certification.0.certType");
            var content = this.field("certification.0.registrar");
            if (type.value != "None") {
                return content.value;
            }
            else {
                this.unset();
            }
        }
    },
    "certification.$.reason": {
        type: String,
        label: "Do You Plan To Pursue Certification? If So When?",
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                var shouldBeRequired = this.field('certification.0.certType').value;
                if (shouldBeRequired == "None") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (!this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("certification.0.certType") != "None") {
                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.field("certification.0.certType");
            var content = this.field("certification.0.reason");
            if (type.value == "None") {
                return content.value;
            }
            else {
                //this.unset();
                return {$unset: ''};
            }
        }
    }
});

EventSchema = new SimpleSchema({
    companyName: {
        type: String,
        label: "Company Name",
        autoform: {
            firstOption: "(Select a Company)",
            options: function () {
                return CompaniesTest.find().map(function (c) {
                    return {label: c.companyName, value: c.companyName};
                })
            }
        }
    },
    eventDate: {
        type: Date,
        label: "Event Date",
        autoValue: function () {
            var tempDate = this.field("eventDate").value;
            return tempDate;
        }
    },
    eventType: {
        type: String,
        label: "Event Type",
        autoform: {
            firstOption: "(Select an Event Type)",
            options: function () {
                return [
                    {label: "Quality", value: "Quality"},
                    {label: "Delivery", value: "Delivery"}
                ];
            }
        }
    },
    tlPartNumber: {
        type: String,
        label: "T&L Part Number"
    },
    purchaseOrderNumber: {
        type: String,
        label: "Purchase Order Number"
    },
    lotNumber: {
        type: String,
        label: "Lot Number"
    },
    carNumber: {
        type: String,
        label: "CAR Number"
    },
    quantityReject: {
        type: Number,
        label: "Quantity Rejected",
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                console.log(this.field("quantityReject"));
                var shouldBeRequired = this.field('eventType').value;
                if (shouldBeRequired == "Quality") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("eventType") != "Quality") {

                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.siblingField("eventType");
            var content = this.siblingField("quantityReject");
            console.log(type.value);
            console.log(content.value);
            if (type.value == "Quality") {
                console.log(this.operator);
                console.log(!this.operator);
                console.log(this.isSet);
                //insert
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === "") {
                        console.log("15");
                        return content.value;
                    }
                }
                // updates
                else if (this.isSet) {
                    if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return content.value;
                }
                else {
                    return content.value;
                }
            }
            else if (type.value == "Delivery") {
                if (this.operator) {
                    if (this.isSet || this.value === null || this.value === "") {
                        console.log("7");
                        return {$unset: ''};
                    }
                }
                // updates
                else if (!this.isSet) {
                    if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return content.value;
                }
                else {
                    return content.value;
                }
            }

        }
    },
    requiredDate: {
        type: Date,
        label: "Required Delivery Date",
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                console.log(this.field("requiredDate"));
                var shouldBeRequired = this.siblingField('eventType').value;
                if (shouldBeRequired == "Delivery") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (this.isSet) {

                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("eventType") != "Delivery") {
                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.siblingField("eventType");
            var content = this.siblingField("requiredDate");
            console.log(type.value);
            console.log(content.value);
            if (type.value == "Delivery") {
                console.log(this.operator);
                console.log(!this.operator);
                console.log(this.isSet);
                //insert
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === "") {
                        console.log("7");
                        return content.value;
                    }
                }
                // updates
                else if (this.isSet) {
                    if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return content.value;
                }
                else {
                    return content.value;
                }
            }
            else if (type.value == "Quality") {
                console.log(this.operator);
                console.log(!this.operator);
                console.log(this.isSet);
                //insert
                if (this.operator) {
                    if (!this.isSet || this.value === null || this.value === "") {
                        console.log("15");
                        return {$unset: ''};
                    }
                }
                // updates
                else if (!this.isSet) {
                    if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return content.value;
                }
                else {
                    return content.value;
                }
            }
            //else if (type.value == "Quality") {
            //    console.log("Trying to Unset requiredDate");
            //    console.log(this.isSet);
            //    if (this.isSet) {
            //        console.log("Unsetting to blank");
            //        //return {$unset: ''};
            //        return {$unset: ''};
            //    }
            //    else if (!this.isSet) {
            //        console.log("Unsetting via unset()");
            //        if (!this.isSet && this.value != null || this.value != "") {
            //            console.log("1");
            //            return {$unset: ''};
            //        }
            //        else if (!this.isSet || this.value === null || this.value === "") {
            //            console.log("2");
            //
            //            return this.unset();
            //        }
            //        else {
            //            console.log("3");
            //
            //            return {$unset: ''};
            //        }
            //        console.log("4");
            //        //this.unset();
            //        //return {$unset: ''};
            //    }
            //    else {
            //        console.log("5");
            //        this.unset();
            //    }
            //    console.log("6");
            //    return {$unset: ''};
            //}
        }
    },
    actualDate: {
        type: Date,
        label: "Actual Delivery Date",
        optional: true,
        custom: function () {
            if (Meteor.isClient) {
                console.log(this.field("actualDate"));
                var shouldBeRequired = this.siblingField('eventType').value;
                if (shouldBeRequired == "Delivery") {
                    // inserts
                    if (!this.operator) {
                        if (!this.isSet || this.value === null || this.value === "") return "required";
                    }
                    // updates
                    else if (this.isSet) {
                        if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return "required";
                        if (this.operator === "$unset") return "required";
                        if (this.operator === "$rename") return "required";
                    }
                }
            }
        },
        autoform: {
            type: function () {
                if (AutoForm.getFieldValue("eventType") != "Delivery") {
                    return "hidden";
                }
            }
        },
        autoValue: function () {
            var type = this.siblingField("eventType");
            var content = this.siblingField("requiredDate");
            console.log(type.value);
            console.log(content.value);
            if (type.value == "Delivery") {
                console.log(this.operator);
                console.log(!this.operator);
                console.log(this.isSet);
                //insert
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === "") {
                        console.log("7");
                        return content.value;
                    }
                }
                // updates
                else if (this.isSet) {
                    if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return content.value;
                }
                else {
                    return content.value;
                }
            }
            else if (type.value == "Quality") {
                console.log(this.operator);
                console.log(!this.operator);
                console.log(this.isSet);
                //insert
                if (this.operator) {
                    if (!this.isSet || this.value === null || this.value === "") {
                        console.log("15");
                        return {$unset: ''};
                    }
                }
                // updates
                else if (!this.isSet) {
                    if (this.operator === "$set" && this.value === null || this.value === "" || this.value === undefined) return content.value;
                }
                else {
                    return content.value;
                }
            }
        }
    },
    rootCause: {
        type: String,
        label: "Root Cause"
    },
    statusOption: {
        type: String,
        label: "Status",
        autoform: {
            firstOption: "(Select a Status)",
            options: function () {
                return [
                    {label: "Open", value: 1},
                    {label: "Pending", value: 0},
                    {label: "Closed", value: -1}
                ];
            }
        }
    }
});

CompaniesTest.attachSchema(CompaniesSchema);

EventsTest.attachSchema(EventSchema);

//CompaniesTest.insert({
//    companyName: "T&L Automatics",
//    companyAddress: "770 Emerson",
//    salesName: "Thanh Pham",
//    salesEmail: "gwfreak01@gmail.com",
//    salesPhone: "9406132066",
//    qualityName: "Thanh Pham",
//    qualityEmail: "gwfreak01@gmail.com",
//    qualityPhone: "9406132066",
//    logisticsName: "Thanh Pham",
//    logisticsEmail: "gwfreak01@gmail.com",
//    logisticsPhone: "9406132066",
//    itemDescription: "Pipes and Bombs",
//    certification: [{
//        certType: "1",
//        expirationDate: "3/4/2015",
//        certNumber: "1234",
//        registrar: "Thanh Pham"
//
//    }, {
//        certType: "2",
//        expirationDate: "3/5/2016",
//        certNumber: "12341234",
//        registrar: "Thanh Pham"
//    }]
//});

Router.configure({
    layoutTemplate: 'main'
});

if (Meteor.isClient) {
    Meteor.subscribe('userList');
    Meteor.subscribe('companies_Test');
    Meteor.subscribe('events_Test');
    AutoForm.hooks({
        insertCompanyForm: {
            onSuccess: function (insert, result) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-full-width",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                if (Roles.userIsInRole(Meteor.userId(), 'supplier')) {
                    var options = {
                        from: "sms@tandlautomatics.com",
                        to: "sms@tandlautomatics.com",
                        subject: "New Company - T&L Supplier Management Application",
                        text: AutoForm.getFieldValue("companyName", "insertCompanyForm") + " has just registered"
                    };
                    Meteor.call("sendEmail", options);
                    toastr.success("Thank you for registering!", "Registration Success");
                    Meteor.logout();
                    Router.go('/');
                }
                else {
                    toastr.success("Thank you for registering!", "Registration Success");
                    Router.go('/companies');
                }
            },
            onError: function (insert, error) {
                console.log(error.reason);
                return error;
            }
        }
    });
    AutoForm.hooks({
        updateCompanyForm: {
            before: {
                'method-update': function (doc) {
                    // For some reason all translations are unset here for fields that were not in form
                    if (doc['$unset']) {
                        doc['$unset'] = _.pick(doc['$unset'], function (item, key) {
                            return key.indexOf('i18n.') !== 0;
                        });
                    }
                    ;
                    return doc;
                },
            },
            onSuccess: function (insert, result) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-full-width",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                toastr.success("Company Details Updated", "Update Success");
                Router.go('/companies');
            },
            onError: function (insert, error) {
                console.log(error);
                return error;
            }
        }
    });
    AutoForm.hooks({
        insertEventForm: {
            onSuccess: function (insert, result) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-full-width",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                toastr.success("Successfully Added New Event", "Event Submit Success");
                Router.go('/events');
            },
            onError: function (insert, error) {
                console.log(error.reason);
                return error;
            }
        }
    });
    AutoForm.hooks({
        updateEventForm: {
            onSuccess: function (insert, result) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-full-width",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                toastr.success("Event Details Updated", "Update Success");
                Router.go('/events');
            },
            onError: function (insert, error) {
                console.log(error.reason);
                return error;
            }
        }
    });
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
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                var html = Blaze.toHTML(Template.registerEmail);
                var options = {
                    from: 'sms@tandlautomatics.com',
                    to: document.getElementById("emailInvite").value,
                    replyTo: 'sms@tandlautomatics.com',
                    subject: 'Registration Request - T&L Supplier Management Application',
                    html: html
                };
                Meteor.call("sendEmail", options);
                toastr.info("Invitation Sent");
            },
            'click .btn-info': function (e) {
                var companyID = this._id;
                Session.set('selectedCompany', companyID);
                e.stopPropagation();
                var confirm = window.confirm("Send All Feedback?");
                if (confirm) {
                    var companyList = CompaniesTest.find().fetch();
                    var start = new Date();
                    //var start1 = moment(start).format("YYYY-MM-DD");
                    var start1 = moment(start);
                    var end = new Date(new Date(start).setMonth(start.getMonth() - 12));
                    //var end1 = moment(end).format("YYYY-MM-DD");
                    var end1 = moment(end);
                    _.each(companyList, function (company) {
                        var selectedCompany = company._id;
                        var num = 0;
                        num += EventsTest.find({
                            companyName: company.companyName,
                            eventDate: {$lte: start, $gte: end},
                            statusOption: "0"
                        }, {sort: {statusOption: -1, eventDate: -1}}).count();
                        num += EventsTest.find({
                            companyName: company.companyName,
                            eventDate: {$lte: start, $gte: end},
                            statusOption: "1"
                        }, {sort: {statusOption: -1, eventDate: -1}}).count();
                        console.log(company.companyName + " has " + num + " red/yellow events");
                        Session.set('eventNumber', num);
                        var data = {
                            eventItems: EventsTest.find({
                                companyName: company.companyName,
                                eventDate: {$lte: start, $gte: end}
                            }, {sort: {statusOption: -1, eventDate: -1}}).fetch()
                        }
                        var html = Blaze.toHTMLWithData(Template.feedbackEmail, data);
                        Meteor.call('sendFeedbackEmail', selectedCompany, html);
                    });
                }
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
            'click .company': function (e) {
                e.stopPropagation();
                var companyID = this._id;
                if (companyID == null) {
                    Router.go("/companies");
                }
                else {
                    Router.go("/companies/details/" + this._id);
                    Session.set('selectedCompany', companyID);
                }
            },
            'click .btn-warning': function (e) {
                var companyID = this._id;
                Session.set('selectedCompany', companyID);
                e.stopPropagation();
                Router.go("/companies/edit/" + companyID);
            },
            'click .btn-danger': function (e) {
                var companyID = this._id;
                Session.set('selectedCompany', companyID);
                e.stopPropagation();
                var selectedCompany = Session.get('selectedCompany');
                var confirm = window.confirm("Delete this Company?");
                if (confirm) {
                    Meteor.call('removeCompanyData', selectedCompany);
                }
            },
            'click .btn-info': function (e) {
                var companyID = this._id;
                Session.set('selectedCompany', companyID);
                e.stopPropagation();
                var selectedCompany = Session.get('selectedCompany');
                console.log(selectedCompany);
                var confirm = window.confirm("Send Feedback?");
                if (confirm) {
                    var start = new Date();
                    //var start1 = moment(start).format("YYYY-MM-DD");
                    var start1 = moment(start);
                    console.log("Start Date: " + start);
                    var end = new Date(new Date(start).setMonth(start.getMonth() - 12));
                    //var end1 = moment(end).format("YYYY-MM-DD");
                    var end1 = moment(end);
                    console.log("End Date: " + end);
                    var num = 0;
                    num = num + EventsTest.find({
                            companyName: this.companyName,
                            eventDate: {$lte: start, $gte: end},
                            statusOption: "0"
                        }, {sort: {statusOption: -1, eventDate: -1}}).count();
                    num = num + EventsTest.find({
                            companyName: this.companyName,
                            eventDate: {$lte: start, $gte: end},
                            statusOption: "1"
                        }, {sort: {statusOption: -1, eventDate: -1}}).count();
                    Session.set('eventNumber', num);
                    console.log("Number of red/yellow events: " + Session.get('eventNumber'));
                    var dataContext = {
                        eventItems: EventsTest.find({
                            companyName: this.companyName,
                            eventDate: {$lte: start, $gte: end}
                        }, {sort: {statusOption: -1, eventDate: -1}}).fetch()
                    };
                    var html = Blaze.toHTMLWithData(Template.feedbackEmail, dataContext);
                    var data = {
                        event: EventsTest.find({companyName: this.companyName}, {sort: {statusOption: -1}}).fetch()
                    };
                    Meteor.call('sendFeedbackEmail', selectedCompany, html);
                }
            }
        }),
        Template.companyListDisplay.helpers({
            'company': function () {
                return CompaniesTest.find({}, {sort: {companyName: 1}});
            }
        }),
        Template.detailCompany.helpers({
            '[name=insertCompanyForm]': function () {
                return CompaniesTest.findOne({_id: this._id});
            }
        }),
        Template.editCompany.helpers({
            '[name=updateCompanyForm]': function () {
                return CompaniesTest.findOne({_id: this._id});
            }
        }),
        Template.eventListDisplay.events({
            'click .event': function (e) {
                e.stopPropagation();
                var eventID = this._id;
                Router.go("/events/details/" + this._id);
                Session.set('selectedEvent', eventID);
            },
            'click .btn-danger': function (e) {
                var eventID = this._id;
                Session.set('selectedEvent', eventID);
                e.stopPropagation();
                var selectedEvent = Session.get('selectedEvent');
                var confirm = window.confirm("Delete this Event?");
                if (confirm) {
                    Meteor.call('removeEventData', selectedEvent);
                }
            }
        }),
        Template.eventListDisplay.helpers({
            'event': function () {
                return EventsTest.find({}, {sort: {statusOption: -1, eventDate: 1}}).map(function (document, index) {
                    document.index = index + 1;
                    return document;
                });
            },
            'eventBad': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "1") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'eventMid': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "0") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'eventGood': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "-1") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'statusOptionConverter': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "1") {
                    return "Open";
                }
                else if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "0") {
                    return "Pending";
                }
                else {
                    return "Closed";
                }
            }
        }),
        Template.insertEventForm.helpers({
            'showDelivery': function () {
                var docId = AutoForm.getFieldValue("eventType");
                if (docId == "Delivery") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }),
        Template.detailEvent.helpers({
            'showDelivery': function () {
                var docId = AutoForm.getFieldValue("eventType");
                if (docId == "Delivery") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }),
        Template.editEvent.helpers({
            'showDelivery': function () {
                var docId = AutoForm.getFieldValue("eventType");
                if (docId == "Delivery") {
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
        Template.companyEventListDisplay.events({
            'click .event': function (e) {
                e.stopPropagation();
                var eventID = this._id;
                Router.go("/events/details/" + this._id);
                Session.set('selectedEvent', eventID);
            }
        }),
        Template.companyEventListDisplay.helpers({
            'event': function () {
                return EventsTest.find({companyName: this.companyName}, {
                    sort: {
                        statusOption: -1,
                        eventDate: -1
                    }
                }).map(function (document, index) {
                    document.index = index + 1;
                    console.log(document);
                    return document;
                });
            },
            'eventBad': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "1") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'eventMid': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "0") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'eventGood': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "-1") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'statusOptionConverter': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "1") {
                    return "Open";
                }
                else if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "0") {
                    return "Pending";
                }
                else {
                    return "Closed";
                }
            }
        }),
        Template.feedbackEmail.helpers({
            'eventBad': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "1") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'eventMid': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "0") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'eventGood': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "-1") {
                    return true;
                }
                else {
                    return false;
                }
            },
            'statusOptionConverter': function () {
                if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "1") {
                    return "Open";
                }
                else if (EventsTest.find({_id: this._id}, {sort: {statusOption: 1}}).fetch()[0].statusOption == "0") {
                    return "Pending";
                }
                else {
                    return "Closed";
                }
            },
            'green': function () {
                var start = new Date();
                //var start1 = moment(start).format("YYYY-MM-DD");
                var start1 = moment(start);
                var end = new Date(new Date(start).setMonth(start.getMonth() - 12));
                //var end1 = moment(end).format("YYYY-MM-DD");
                var end1 = moment(end);
                var num = EventsTest.find({
                    companyName: this.companyName,
                    eventDate: {$lte: start, $gte: end},
                    statusOption: "0"
                }, {sort: {statusOption: -1, eventDate: -1}}).count();

                num += EventsTest.find({
                    companyName: this.companyName,
                    eventDate: {$lte: start, $gte: end},
                    statusOption: "1"
                }, {sort: {statusOption: -1, eventDate: -1}}).count();
                var rand = Session.get('eventNumber');
                console.log(rand);
                if (rand < 2) {
                    return true;
                }
                else {
                    return false;
                }
            },
            'yellow': function () {
                var start = new Date();
                //var start1 = moment(start).format("YYYY-MM-DD");
                var start1 = moment(start);
                var end = new Date(new Date(start).setMonth(start.getMonth() - 12));
                //var end1 = moment(end).format("YYYY-MM-DD");
                var end1 = moment(end);
                var num1 = 0;
                num1 = num1 + EventsTest.find({
                        companyName: this.companyName,
                        eventDate: {$lte: start, $gte: end},
                        statusOption: "0"
                    }, {sort: {statusOption: -1, eventDate: -1}}).count();
                num1 = num1 + EventsTest.find({
                        companyName: this.companyName,
                        eventDate: {$lte: start, $gte: end},
                        statusOption: "1"
                    }, {sort: {statusOption: -1, eventDate: -1}}).count();
                var rand = Session.get('eventNumber');
                if ((2 <= rand) && (rand <= 4)) {
                    return true;
                }
                else {
                    return false;
                }
            },
            'red': function () {
                var start = new Date();
                //var start1 = moment(start).format("YYYY-MM-DD");
                var start1 = moment(start);
                var end = new Date(new Date(start).setMonth(start.getMonth() - 12));
                //var end1 = moment(end).format("YYYY-MM-DD");
                var end1 = moment(end);
                var num2 = 0;
                num2 = num2 + EventsTest.find({
                        companyName: this.companyName,
                        eventDate: {$lte: start, $gte: end},
                        statusOption: "0"
                    }, {sort: {statusOption: -1, eventDate: -1}}).count();
                num2 = num2 + EventsTest.find({
                        companyName: this.companyName,
                        eventDate: {$lte: start, $gte: end},
                        statusOption: "1"
                    }, {sort: {statusOption: -1, eventDate: -1}}).count();
                var rand = Session.get('eventNumber');
                if (rand > 4) {
                    return true;
                }
                else {
                    return false;
                }
            }
        })
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        //EMAIL 1
        process.env.MAIL_URL = 'smtp://postmaster%40sandbox9a11769c25e04579a3d65d9e8f4e20cd.mailgun.org:b54cb40a370534e4f1ff467f7e836cf3@smtp.mailgun.org:587';
        //BACKUP EMAIL 2
        //process.env.MAIL_URL = 'smtp://postmaster@sandboxf72dcb6d24b74639b5832e8ecba2b886.mailgun.org:23862cf6d8d1a0c7f81fb5bf3565f130@smtp.mailgun.org:587';
        //process.env.MAIL_URL = 'stmp://tpham:8ofFic1al~@tandlautomatics.com:25';
        if (!Meteor.users.findOne()) {
            var users = [
                {name: "Admin User", username: "admin", roles: ['admin']},
                {name: "Employee User", username: "employee", roles: ['employee']},
                {name: "Supplier User", username: "supplier", roles: ['supplier']}
            ];
            _.each(users, function (user) {
                if (user.username == "admin") {
                    var id = Accounts.createUser({
                        username: user.username,
                        password: "tlsms",
                        profile: {name: user.name}
                    });
                }
                else if (user.username == "employee") {
                    var id = Accounts.createUser({
                        username: user.username,
                        password: "tlemployee",
                        profile: {name: user.name}
                    });
                }
                else if (user.username == "supplier"){
                    var id = Accounts.createUser({
                        username: user.username,
                        password: "apple1",
                        profile: {name: user.name}
                    });
                }
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
    Meteor.publish('companies_Test', function () {
        if (Roles.userIsInRole(this.userId, ['admin', 'employee'])) {
            var currentUserID = this.userId;
            return CompaniesTest.find({});
        }
        else {
            this.stop();
            return;
        }
    });

    Meteor.publish('events_Test', function () {
        if (Roles.userIsInRole(this.userId, ['admin', 'employee'])) {
            var currentUserID = this.userId;
            return EventsTest.find({});
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

    Meteor.publish(null, function () {
        return Meteor.roles.find({})
    });

    CompaniesTest.allow({
        'insert': function (userId, doc) {
            return true;
        },
        'update': function (userId, doc) {
            return true;
        },
        'remove': function (userId, doc) {
            return true;
        }
    });
    EventsTest.allow({
        'insert': function (userId, doc) {
            return true;
        },
        'update': function (userId, doc) {
            return true;
        },
        'remove': function (userId, doc) {
            return true;
        }
    });
    Meteor.methods({
        'removeCompanyData': function (selectedCompany) {
            var currentUserID = Meteor.userId();
            if (Roles.userIsInRole(currentUserID, 'admin')) {
                CompaniesTest.remove({_id: selectedCompany});
            }
        },

        'removeEventData': function (selectedEvent) {
            var currentUserID = Meteor.userId();
            if (Roles.userIsInRole(currentUserID, 'admin')) {
                EventsTest.remove({_id: selectedEvent});
            }
        },
        'sendEmail': function (options) {
            //'sendEmail': function (to, from, replyTo, subject) {
            //check([to, from, subject, text], [String]);

            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.

            this.unblock();
            Email.send(options);
        },
        'sendFeedbackEmail': function (selectedCompany, html) {
            this.unblock();

            var currentUserID = Meteor.userId();
            var sendPeople = [];
            if (Roles.userIsInRole(currentUserID, 'admin')) {
                sendPeople.push(CompaniesTest.find({_id: selectedCompany}).fetch()[0].salesPerson);
                sendPeople.push(CompaniesTest.find({_id: selectedCompany}).fetch()[0].qualityPerson);
                sendPeople.push(CompaniesTest.find({_id: selectedCompany}).fetch()[0].logisticsPerson);
                sendPeople.push(CompaniesTest.find({_id: selectedCompany}).fetch()[0].differentPerson);
                sendPeople = sendPeople.filter(Boolean);
                var i = 0;
                while (i < sendPeople.length) {
                    var emailStatus = sendPeople[i].status;
                    if (emailStatus) {
                        console.log(sendPeople[i].email + ": " + emailStatus);
                        var options = {
                            from: 'sms@tandlautomatics.com',
                            to: sendPeople[i].email,
                            replyTo: 'sms@tandlautomatics.com',
                            subject: 'Quarterly Feedback - T&L Supplier Management Application',
                            html: html,
                            date: new Date()
                            //,
                            //cc: ["gwfreak01@gmail.com", "bill@tandlautomatics.com"]
                        };
                        //Meteor.call('scheduleMail', options);
                        Email.send(options);
                    }
                    else {
                        console.log("No different person email");
                    }
                    i++;
                }
            }
        }
    });
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
        return Meteor.subscribe("companies_Test");
    }
});

Router.route('/companies/newCompany', {
    template: 'addCompanyForm',
    data: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("companies_Test", this._id);
    }
});

Router.route('/companies/details/:_id', {
    template: 'detailCompany',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("companies_Test");
    },
    data: function () {
        var currentList = this.params._id;
        return CompaniesTest.findOne({_id: currentList});
    }
});

Router.route('/companies/edit/:_id', {
    template: 'editCompany',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("companies_Test");
    },
    data: function () {
        var currentList = this.params._id;
        return CompaniesTest.findOne({_id: currentList});
    }
});

Router.route('/events', {
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("events_Test");
    }
});

Router.route('/events/newEvent', {
    template: 'addEventForm'
});

Router.route('/events/details/:_id', {
    template: 'detailEvent',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("events_Test");
    },
    data: function () {
        var currentList = this.params._id;
        return EventsTest.findOne({_id: currentList});
    }
});

Router.route('/events/edit/:_id', {
    template: 'editEvent',
    waitOn: function () {
        // waitOn makes sure that this publication is ready before rendering your template
        return Meteor.subscribe("events_Test");
    },
    data: function () {
        var currentList = this.params._id;
        //Session.set("eventID", currentList);
        return EventsTest.findOne({_id: currentList});
    }
});

Router.route('/registerCompany');

Router.route('/insertCompanyForm');