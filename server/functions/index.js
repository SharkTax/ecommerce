const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true})

//initalize the admin

admin.initializeApp();

//initialize the db instance
const db = admin.firestore();

// function to validate the user jwt token
//here he uses the functions property from firebase, ande start the request
exports.validataUserJWTToken = functions.https.onRequest(async (req, res) => {
    //enabling the cors
    cors(req, res, async()=>{
        //get the authorization word from the header
        const authorizationHeader = req.get("Authorization");

        /*if the header does not contains the header information or does not
         contains in the header the word 'Bearer', so returns 401 unautorized*/
        if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
            return res.status(401).json({error: "Unauthorized"})
        }

        //Extract the token from the authorization header
        const token = authorizationHeader.split("Bearer ")[1];

        try {
            //here i request the admin authorization, to veryfy the if the token, and decode
            const decodedToken = await admin.auth().verifyIdToken(token);
            //block of code to execute only if the decoded token exists
            if(decodedToken){
                //here he referes to the colletion from the database of the server
                const docRef = db.collection("users").doc(decodedToken.uid);
                //and returns the actual data of the current uid
                const doc = await docRef.get()

                //but if the user with the current uid does not exists so register
                if(!doc.exists){
                    const userRef = await db.collection("users").doc(decodedToken.uid);
                    await userRef.set(decodedToken);
                }

                //here returns the user information and 200 as success
                return res.status(200).json({success: true, user:decodedToken})
            }
        } catch (error) {
            console.log("Error on validating : ", error);
            return res.status(402).json({error: error.message, status: "un-Authorized"})
        }
    })
})