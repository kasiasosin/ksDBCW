// After install the supabase-js module
import {createClient} from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// // Create a single supabase client for interacting with your database
const supabase = createClient('https://hcoewqxfecydeqseabxl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjb2V3cXhmZWN5ZGVxc2VhYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzQ1NTAsImV4cCI6MjAyODI1MDU1MH0.syQYXuGh4nRDW6h0Yp0FJdxQ5LuI0MTTrNnI0FblxYI');


//search for person information through name

var nameButton = document.getElementById("button1");
if (nameButton){
    nameButton.addEventListener("click", async () => {
        console.log("Button was clicked!");
        var nameText = document.getElementById("name");
        var vehicleText = document.getElementById("license");
        console.log("The text: " + nameText.value);

        // check if both text boxes are full (not allowed)
        if (vehicleText.value != "" && nameText.value != ""){
            document.getElementById("message").innerHTML = ("Error - both text fields are full");
            console.log("both text boxes are full");
            document.getElementById("results").innerHTML = ("");


        }
        // check if both text boxes are empty (not allowed)
        else if (nameText.value == "" && vehicleText.value == ""){
            document.getElementById("message").innerHTML = ("Error - both text fields are empty");
            console.log("both text boxes are empty");
            document.getElementById("results").innerHTML = ("");


        // if vehicle text has data then search...
        } else if (vehicleText.value != "" && nameText.value == ""){
            console.log("name text empty");
            console.log("searching for vehicle data...");
            const {data, error} =  await supabase.from('People').select('PersonID, Name, Address, DOB, LicenseNumber').ilike('LicenseNumber', "%"+vehicleText.value+"%");
            
            if (data != ""){
                document.getElementById("message").innerHTML = ("Search successful");
                document.getElementById("results").innerHTML = (data);
                console.log("The data: ", data);

            } else {
                console.log("no data");
                document.getElementById("message").innerHTML = ("No result found");

            }
        
        // if name text has data then search...
        }else {
            console.log("vehicle text empty");
            console.log("searching for name data...");
            const {data, error} =  await supabase.from('People').select('PersonID, Name, Address, DOB, LicenseNumber').ilike('Name', "%"+nameText.value+"%");
            
            if (data != ""){
                document.getElementById("message").innerHTML = ("Search successful");
                document.getElementById("results").innerHTML = (data);
                console.log("The data: ", data);

            } else {
                console.log("no data");
                document.getElementById("message").innerHTML = ("No result found");

            }


        }

    });

}



//search for vehicle information through license number

var vehicleButton = document.getElementById("vehicleButton");
if (vehicleButton){
    vehicleButton.addEventListener("click", async () => {
        console.log("Button was clicked!");
        var vehicleText1 = document.getElementById("rego");
        console.log("The text: " + vehicleText1.value);
        if (vehicleText1.value == ""){
            console.log("Error: Search box is empty");
            document.getElementById("message").innerHTML = ("Error - there is missing information");
            document.getElementById("results").innerHTML = ("");

            
        }else{
            console.log("searching for vehicle data...");
            const {data, error} =  await supabase.from('Vehicles').select('VehicleID, Make, Model, Colour, OwnerID').ilike('VehicleID', "%"+vehicleText1.value+"%");
            
            if (data != ""){
                document.getElementById("message").innerHTML = ("Search successful");


    


                data.forEach((currItem) => {

                    // create div 
                    // add text to div
                    // add div to page
                    let row = document.createElement('div');
                    row.innerHTML = ("Vehicle ID: " + currItem.VehicleID + "<br>Vehicle Make: " + currItem.Make + "<br>Vehicle Model: " + currItem.Model + "<br>Vehicle Colour: " + currItem.Colour + "<br>Vehicle Owner ID: " + currItem.OwnerID)
                    let row2 = document.createElement('div');
                    row2.innerHTML = ("<br>")
                    document.getElementById('results').appendChild(row);
                    document.getElementById('results').appendChild(row2);



                    // var p1 = document.createElement('p');

                   

                    // node1 = currItem.VehicleID;
                    // node2 = currItem.Make;
                    // node3 = currItem.Model;
                    // node4 = currItem.Colour;
                    // node5 = currItem.OwnerID;


                    // var elem1 = document.createTextNode(node1);
                    // p1.appendChild(elem1);


                    // var elem2 = document.createTextNode(node2);
                    // p2.appendChild(elem2);

                    // var elem3 = document.createTextNode(node3);
                    // p3.appendChild(elem3);

                    // var elem4 = document.createTextNode(node4);
                    // p4.appendChild(elem4);

                    // var elem5 = document.createTextNode(node5);
                    // p5.appendChild(elem5);

                    // //document.getElementById('p1').innerText(node1);
                    // //document.getElementById('p1').innerText(node1);
                    // //document.getElementById('p1').innerText(node1);
                    // //document.getElementById('p1').innerText(node1);

                    // row += (p1 + p2 + p3 + p4 + p5);

                    // document.getElementById('results').appendChild(row);


                });


                    //var textnode = document.createTextNode("Water");
                    //node.appendChild(textnode);
                    //document.getElementById("myList").appendChild(node);

                        

                        
                } else {
                    console.log("no data");
                    document.getElementById("message").innerHTML = ("No result found");
                    document.getElementById("results").innerHTML = ("");

            }
        }

    });

}

// NEW VEHICLE CODE

var NVButton = document.getElementById("NVButton");
if (NVButton){
    NVButton.addEventListener("click", async () => {
        console.log("Button was clicked!");

        var regoText = document.getElementById("rego");
        var makeText = document.getElementById("make");
        var modelText = document.getElementById("model");
        var colourText = document.getElementById("colour");
        var ownerText = document.getElementById("owner");

        if (regoText.value == "" || makeText == "" || modelText.value == "" || colourText == "" || ownerText.value == ""){
            console.log("Error: There is missing information");
            document.getElementById("message").innerHTML = ("Error - there is missing information");

        }else{
            console.log("checking whether user exists already...")
            const {data, error} =  await supabase.from('People').select('Name').ilike('Name', "%"+ownerText.value+"%");
           
            // if owner already exists...
            if (data != ""){
                console.log("user exists already");
                document.getElementById("results").innerHTML = ("User found: " + data);
        }
        }

    });

}




//                const {data1, error1} =  await supabase.insert('Vehicles').select('VehicleID, Make, Model, Colour, OwnerID').ilike('VehicleID', "%"+vehicleTextV.value+"%");






// example fetching data from table
// const { data, error } = await supabase
// .from('students')
// .select('student_id')
// .eq('username', 'grey07')

// example code
// // Fetch data from the table
// async function fetchData() {
//     const { data, error } = await supabase.from('your_table_name').select();
//     console.log('Fetched data:'
//     , data);
//     }
//     // Call the fetchData function to retrieve data
//     fetchData();

// Inserting data
// const { error } = await supabase.from('students')
// .insert({ first_name: 'Sarah', username: 'sarah05', ... })

// Updating data
//const { error } = await supabase.from('students')
//.update({ username: 'kai01' }).eq('student_id', 1000)

// Deleting data
// const { error } = await supabase.from('countries')
// .delete().eq('username','grey07')