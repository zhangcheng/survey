Template.survey.surveys = function() {
    return Surveys.find();
};

////////// Events //////////
Template.survey.events({
    'click #new-submit' : function (event) {
        event.preventDefault();
        Surveys.insert({
            serialNumber: $("#newSerial").val(),
            ipAddress: $("#newIPAddress").val()
        });

        $("#newSerial").val("");
        $("#newIPAddress").val("");
        $("#newOtherHardware").val("");
    },
});
