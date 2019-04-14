var myobj = [
    {
        "description": "Create an array with the first 10 numbers of the Fibonacci sequence, starting at 1. Don't hard code it, try to come up with a smarter way to make it! Output your array at x to check your answer.",
        "testInputs": ["0", "2", "4", "6", "9"],
        "testOuputs": ["1", "2", "5", "13", "55"],
        "inputType": "int",
        "num": 1
    },
    {
        "description": "Given the string, print out the string with a space between each character. Hint: strings are actually character arrays.",
        "testInputs": ["Array", "Tree", "B", "Data Structure", "12345"],
        "testOuputs": ["A r r a y", "T r e e", "B", "D a t a   S t r u c t u r e", "1 2 3 4 5"],
        "inputType": "string",
        "num": 2
    },
    {
        "description": "Take integer inputs and put them into an array. The first input will be the length of the array, and the rest of the numbers will be what's in the array. Print out the array after storing it.",
        "testInputs": ["5 1 2 3 4 5", "2 99 12", "4 -5 -8 -3 4", "1 10", "8 1 2 3 4 5 6 7 8"],
        "testOuputs": ["1 2 3 4 5", "99 12", "-5 -8 -3 4", "10", "1 2 3 4 5 6 7 8"],
        "inputType": "int",
        "num": 3
    },
    {
        "description": "Use your code from question 3 to take in an integer array as input. Reverse the array.",
        "testInputs": ["5 1 2 3 4 5", "2 99 12", "4 -5 -8 -3 4", "1 10", "8 1 2 3 4 5 6 7 8"],
        "testOuputs": ["5 4 3 2 1", "12 99", "4 -3 -8 -5", "10", "8 7 6 5 4 3 2 1"],
        "inputType": "int",
        "num": 4
    },
    {
        "description": "Use your code from question 3 to take in an integer array as input. Sort the array in increasing order.",
        "testInputs": ["5 3 4 2 5 1", "2 99 12", "4 -5 -8 -3 4", "1 10", "8 8 7 6 5 4 3 2 1"],
        "testOuputs": ["1 2 3 4 5", "12 99", "-8 -5 -3 4", "10", "1 2 3 4 5 6 7 8"],
        "inputType": "int",
        "num": 5
    }
];

database.collection("").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
});
