var config = {
  apiKey: "AIzaSyB_1drGxgx9SYqgTbd2aIWdzusN9xB0YfE",
  authDomain: "train-time-c083d.firebaseapp.com",
  databaseURL: "https://train-time-c083d.firebaseio.com",
  projectId: "train-time-c083d",
  storageBucket: "",
  messagingSenderId: "51269925532"
};

firebase.initializeApp(config);

  var trainDatabase = firebase.database();

  //When Button submit is clicked perform 
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
       name: trainName,
       destination: destination,
       firstTrain: firstTrain,
       frequency: frequency
    }
   
    // Uploads train data to the database
    trainDatabase.ref().push(newTrain);

    // Alert when added
    alert("Train Added");
   
    // Clears all of the text-boxes

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
     return false;

  })

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainDatabase.ref().on("child_added", function(childSnapshot) {

    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");
    
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" +name+ "</td><td>" +destination+ "</td><td>"+frequency+"</td><td>"+arrival+ "</td><td>"+
    minutes+ "</td></tr>");

})




