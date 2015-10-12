//checks if the vector is a vector type; used to check add and sub functions
//this assumes that 
function testEqualVector(vec, x, y) {
  if (Object.keys(vec).toString() != "len,getX,getY,add,sub") {
    return false;
  }
  if (vec.getX() != x) {
     console.log("ehre");
    return false;
  }
  if (vec.getY() != y) {
    return false;
  }
  if (vec.len() != Math.sqrt(x*x + y*y)) {
    return false;
  }
  return true;
}

var vector = createVector(0,0);
console.log(Object.keys(vector).toString() == "len,getX,getY,add,sub");


//module to test vectors; vectors have getX, getY, len, add and sub
QUnit.module("CeateVector Tests", {
  beforeEach: function(){
    
    console.log("Resetting");

},
  afterEach: function(){
     console.log("Done with the test"); 
  }
});

//create multiple vectors, and test their getX and getY
QUnit.test("vector tests", function(assert){
  console.log('Running test one: testing create vector, getX, getY and points.');
  //note that the test for the add and sub functions rely on an external function
  //zero vector
  var zeroV = createVector(0,0);
  assert.equal(zeroV.getX(), 0, "testing zero vectorX");
  assert.equal(zeroV.getY(), 0, "testing zero vectorY");
  assert.equal(zeroV.len(), 0, "testing zero vector length");
  assert.deepEqual(zeroV({x: 1, y: 1}), {x: 1, y: 1}, "testing zero vector point");  // all positive 
  assert.deepEqual(zeroV({x: -20, y: -10}), {x: -20, y: -10}, "testing zero vector point");  // all negative
  assert.deepEqual(zeroV({x: 100, y: -50}), {x: 100, y: -50}, "testing zero vector point");  // x positive, y negative
  assert.deepEqual(zeroV({x: -1000, y: 47}), {x: -1000, y: 47}, "testing zero vector point");  // x negative, y positive
  assert.deepEqual(zeroV({x: 123456789, y: 4567890123}), {x: 123456789, y: 4567890123}, "testing zero vector point");  //positive large numbers
  assert.deepEqual(zeroV({x: -1000000000000000, y: -50000000000}), {x: -1000000000000000, y: -50000000000}, "testing zero vector point");  //negative large numbers
  assert.deepEqual(zeroV({x: 100.5, y: 20}), {x: 100.5, y: 20}, "testing zero vector point");  //decimal and integer mix
  assert.deepEqual(zeroV({x: 100.15, y: 0.7568}), {x: 100.15, y: 0.7568}, "testing zero vector point");  //decimals
  assert.deepEqual(zeroV({x: -2000.19, y: -3.457891010102}), {x: -2000.19, y: -3.457891010102}, "testing zero vector point");  //decimal to increasing precision
  
  //we test the add function and sub function
  var one = createVector(10,10);  //both positive
  assert.deepEqual(testEqualVector(zeroV.add(one), zeroV.getX() + 10, zeroV.getY() + 10), true, "testing add zero vector");
  assert.deepEqual(testEqualVector(zeroV.sub(one), zeroV.getX() - 10, zeroV.getY() - 10), true, "testing sub zero vector");
  var two = createVector(12345,678910);  //both large positive
  assert.deepEqual(testEqualVector(zeroV.add(two), zeroV.getX() + 12345, zeroV.getY() + 678910), true, "testing add zero vector");
  assert.deepEqual(testEqualVector(zeroV.sub(two), zeroV.getX() - 12345, zeroV.getY() - 678910), true, "testing sub zero vector");
  var three = createVector(-20,-10);  //both negative
  assert.deepEqual(testEqualVector(zeroV.add(three), zeroV.getX() - 20, zeroV.getY() - 10), true, "testing add zero vector");
  assert.deepEqual(testEqualVector(zeroV.sub(three), zeroV.getX() + 20, zeroV.getY() + 10), true, "testing sub zero vector");
  var four = createVector(-1000000,-234567);  //both large negative
  assert.deepEqual(testEqualVector(zeroV.add(four), zeroV.getX() - 1000000, zeroV.getY() - 234567), true, "testing add zero vector");
  assert.deepEqual(testEqualVector(zeroV.sub(four), zeroV.getX() + 1000000, zeroV.getY()  + 234567), true, "testing sub zero vector");
  var five = createVector(5656565, -100);  //x positive, y negative
  assert.deepEqual(testEqualVector(zeroV.add(five), zeroV.getX() + 5656565, zeroV.getY() - 100), true, "testing add zero vector");
  assert.deepEqual(testEqualVector(zeroV.sub(five), zeroV.getX() - 5656565, zeroV.getY() + 100), true, "testing sub zero vector");
  
  
  
  //unit vector
  var unitV = createVector(1,1);
  assert.equal(unitV.getX(), 1, "testing unit vectorX");
  assert.equal(unitV.getY(), 1, "testing unit vectorY");
  assert.equal(unitV.len(), Math.sqrt(2), "testing unit vector length");
  assert.deepEqual(unitV({x: 11, y: 1}), {x: 12, y: 2}, "testing unit vector point");  //all positive
  assert.deepEqual(unitV({x: -10, y: -1}), {x: -9, y: 0}, "testing unit vector point");  //all negative
  assert.deepEqual(unitV({x: -1, y: 1}), {x: 0, y: 2}, "testing unit vector point"); //x negative, y positive
  assert.deepEqual(unitV({x: 10, y: -1}), {x: 11, y: 0}, "testing unit vector point"); //x positive, y negative
  assert.deepEqual(unitV({x: 123446789, y: 989567839}), {x: 123446790, y: 989567840}, "testing unit vector point"); //positive large number
  assert.deepEqual(unitV({x: -100000000, y: -6786786788}), {x: -99999999, y: -6786786787}, "testing unit vector point"); //negative large number
  assert.deepEqual(unitV({x: 100.5, y: 20}), {x: 101.5, y: 21}, "testing unit vector point");  //decimal and integer mix
  assert.deepEqual(unitV({x: 100.15, y: 0.756}), {x: 101.15, y: 1.756}, "testing unit vector point");  //decimals
  assert.deepEqual(unitV({x: -2000.19, y: -3.457891010102}), {x: -1999.19, y: -2.457891010102}, "testing unit vector");  //decimals to increasing precision
  
  //testing the add and sub functions
  assert.deepEqual(testEqualVector(unitV.add(one), unitV.getX() + 10, unitV.getY() + 10), true, "testing add unit vector");
  assert.deepEqual(testEqualVector(unitV.sub(one), unitV.getX() - 10, unitV.getY() - 10), true, "testing sub unit vector");
  assert.deepEqual(testEqualVector(unitV.add(two), unitV.getX() + 12345, unitV.getY() + 678910), true, "testing add unit vector");
  assert.deepEqual(testEqualVector(unitV.sub(two), unitV.getX() - 12345, unitV.getY() - 678910), true, "testing sub unit vector");
  assert.deepEqual(testEqualVector(unitV.add(three), unitV.getX() - 20, unitV.getY() - 10), true, "testing add unit vector");
  assert.deepEqual(testEqualVector(unitV.sub(three), unitV.getX() + 20, unitV.getY() + 10), true, "testing sub unit vector");
  assert.deepEqual(testEqualVector(unitV.add(four), unitV.getX() - 1000000, unitV.getY() - 234567), true, "testing add unit vector");
  assert.deepEqual(testEqualVector(unitV.sub(four), unitV.getX() + 1000000, unitV.getY()  + 234567), true, "testing sub unit vector");
  assert.deepEqual(testEqualVector(unitV.add(five), unitV.getX() + 5656565, unitV.getY() - 100), true, "testing add unit vector");
  assert.deepEqual(testEqualVector(unitV.sub(five), unitV.getX() - 5656565, unitV.getY() + 100), true, "testing sub unit vector");
  
  
  //all positive vector
  var posV = createVector(500,457);
  assert.equal(posV.getX(), 500, "testing pos vectorX");
  assert.equal(posV.getY(), 457, "testing pos vectorY");
  assert.equal(posV.len(), Math.sqrt(458849), "testing pos vector length");
  assert.deepEqual(posV({x: 5, y: 5}), {x: 505, y: 462}, "testing pos vector point"); //all positive
  assert.deepEqual(posV({x: -11, y: -10}), {x: 489, y: 447}, "testing pos vector point"); //all negative
  assert.deepEqual(posV({x: -31, y: 15}), {x: 469, y: 472}, "testing pos vector point"); //x negative, y positive
  assert.deepEqual(posV({x: 10, y: -10}), {x: 510, y: 447}, "testing pos vector point"); //x positive, y negative
  assert.deepEqual(posV({x: 123567689, y: 9813741872}), {x: 123568189, y: 9813742329}, "testing pos vector point"); //positive large number
  assert.deepEqual(posV({x: -100000000, y: -6786786788}), {x: -99999500, y: -6786786331}, "testing pos vector point"); //negative large number
  assert.deepEqual(posV({x: 100.5, y: 20}), {x: 600.5, y: 457 + 20}, "testing unit vector point");  //decimal and integer mix
  assert.deepEqual(posV({x: 100.15, y: 0.756}), {x: 500 + 100.15, y: 457 + 0.756}, "testing unit vector point");  //decimals
  assert.deepEqual(posV({x: -2000.19, y: -3.457891010102}), {x: 500 - 2000.19, y: 457 - 3.457891010102}, "testing unit vector");  //decimals to increasing precision
  
  //testing the add and sub function
  assert.deepEqual(testEqualVector(posV.add(one), posV.getX() + 10, posV.getY() + 10), true, "testing add pos vector");
  assert.deepEqual(testEqualVector(posV.sub(one), posV.getX() - 10, posV.getY() - 10), true, "testing sub pos vector");
  assert.deepEqual(testEqualVector(posV.add(two), posV.getX() + 12345, posV.getY() + 678910), true, "testing add pos vector");
  assert.deepEqual(testEqualVector(posV.sub(two), posV.getX() - 12345, posV.getY() - 678910), true, "testing sub pos vector");
  assert.deepEqual(testEqualVector(posV.add(three), posV.getX() - 20, posV.getY() - 10), true, "testing add pos vector");
  assert.deepEqual(testEqualVector(posV.sub(three), posV.getX() + 20, posV.getY() + 10), true, "testing sub pos vector");
  assert.deepEqual(testEqualVector(posV.add(four), posV.getX() - 1000000, posV.getY() - 234567), true, "testing add pos vector");
  assert.deepEqual(testEqualVector(posV.sub(four), posV.getX() + 1000000, posV.getY()  + 234567), true, "testing sub pos vector");
  assert.deepEqual(testEqualVector(posV.add(five), posV.getX() + 5656565, posV.getY() - 100), true, "testing add pos vector");
  assert.deepEqual(testEqualVector(posV.sub(five), posV.getX() - 5656565, posV.getY() + 100), true, "testing sub pos vector");
  
  //all negative vector
  var negV = createVector(-1000,-789);
  assert.equal(negV.getX(), -1000, "testing neg vectorX");
  assert.equal(negV.getY(), -789, "testing neg vectorY");
  assert.equal(negV.len(), Math.sqrt(1000*1000 + 789*789), "testing neg vector length");
  assert.deepEqual(negV({x: 5, y: 5}), {x: negV.getX()+5, y: negV.getY()+5}, "testing neg vector point"); //all positive
  assert.deepEqual(negV({x: -11, y: -10}), {x: negV.getX() - 11, y: negV.getY() - 10}, "testing neg vector point"); //all negative
  assert.deepEqual(negV({x: -31, y: 15}), {x: negV.getX() - 31, y: negV.getY() + 15}, "testing neg vector point"); //x negative, y positive
  assert.deepEqual(negV({x: 10, y: -10}), {x: negV.getX() + 10, y: negV.getY() - 10}, "testing neg vector point"); //x positive, y negative
  assert.deepEqual(negV({x: 123456789, y: 9813741872}), {x: negV.getX() + 123456789, y: negV.getY() + 9813741872}, "testing neg vector point"); //positive large number
  assert.deepEqual(negV({x: -100000000, y: -6786786788}), {x: negV.getX() - 100000000, y: negV.getY() - 6786786788}, "testing neg vector point"); //negative large number
  assert.deepEqual(negV({x: 100.5, y: 20}), {x: -1000 + 100.5 , y: -789 + 20}, "testing neg vector point");  //decimal and integer mix
  assert.deepEqual(negV({x: 100.15, y: 0.756}), {x: -1000 + 100.15, y: -789 + 0.756}, "testing neg vector point");  //decimals
  assert.deepEqual(negV({x: -2000.19, y: -3.457891010102}), {x: -1000 - 2000.19, y: -789 - 3.457891010102}, "testing neg vector");  //decimals to increasing precision
  
  //testing the add and sub functions
  assert.deepEqual(testEqualVector(negV.add(one), negV.getX() + 10, negV.getY() + 10), true, "testing add neg vector");
  assert.deepEqual(testEqualVector(negV.sub(one), negV.getX() - 10, negV.getY() - 10), true, "testing sub neg vector");
  assert.deepEqual(testEqualVector(negV.add(two), negV.getX() + 12345, negV.getY() + 678910), true, "testing add neg vector");
  assert.deepEqual(testEqualVector(negV.sub(two), negV.getX() - 12345, negV.getY() - 678910), true, "testing sub neg vector");
  assert.deepEqual(testEqualVector(negV.add(three), negV.getX() - 20, negV.getY() - 10), true, "testing add neg vector");
  assert.deepEqual(testEqualVector(negV.sub(three), negV.getX() + 20, negV.getY() + 10), true, "testing sub neg vector");
  assert.deepEqual(testEqualVector(negV.add(four), negV.getX() - 1000000, negV.getY() - 234567), true, "testing add neg vector");
  assert.deepEqual(testEqualVector(negV.sub(four), negV.getX() + 1000000, negV.getY()  + 234567), true, "testing sub neg vector");
  assert.deepEqual(testEqualVector(negV.add(five), negV.getX() + 5656565, negV.getY() - 100), true, "testing add neg vector");
  assert.deepEqual(testEqualVector(negV.sub(five), negV.getX() - 5656565, negV.getY() + 100), true, "testing sub neg vector");
  
  //mixture
  var mixV = createVector(-5000,2000);
  assert.equal(mixV.getX(), -5000, "testing mix vectorX");
  assert.equal(mixV.getY(), 2000, "testing mix vectorY");
  assert.equal(mixV.len(), Math.sqrt(5000*5000 + 2000*2000), "testing mix vector length");
  assert.deepEqual(mixV({x: 5, y: 5}), {x: mixV.getX()+5, y: mixV.getY()+5}, "testing mix vector point"); //all positive
  assert.deepEqual(mixV({x: -11, y: -10}), {x: mixV.getX() - 11, y: mixV.getY() - 10}, "testing mix vector point"); //all negative
  assert.deepEqual(mixV({x: -31, y: 15}), {x: mixV.getX() - 31, y: mixV.getY() + 15}, "testing mix vector point"); //x negative, y positive
  assert.deepEqual(mixV({x: 10, y: -10}), {x: mixV.getX() + 10, y: mixV.getY() - 10}, "testing mix vector point"); //x positive, y negative
  assert.deepEqual(mixV({x: 123456789, y: 9813741872}), {x: mixV.getX() + 123456789, y: mixV.getY() + 9813741872}, "testing mix vector point"); //positive large number
  assert.deepEqual(mixV({x: -100000000, y: -6786786788}), {x: mixV.getX() - 100000000, y: mixV.getY() - 6786786788}, "testing mix vector point"); //negative large number
  assert.deepEqual(mixV({x: 100.5, y: 20}), {x: -5000 + 100.5 , y: 2000 + 20}, "testing mix vector point");  //decimal and integer mix
  assert.deepEqual(mixV({x: 100.15, y: 0.756}), {x: -5000 + 100.15, y: 2000 + 0.756}, "testing mix vector point");  //decimals
  assert.deepEqual(mixV({x: -2000.19, y: -3.457891010102}), {x: -5000 - 2000.19, y: 2000 - 3.457891010102}, "testing mix vector");  //decimals to increasing precision
  
  //testing add and sub function
  assert.deepEqual(testEqualVector(mixV.add(one), mixV.getX() + 10, mixV.getY() + 10), true, "testing add mix vector");
  assert.deepEqual(testEqualVector(mixV.sub(one), mixV.getX() - 10, mixV.getY() - 10), true, "testing sub mix vector");
  assert.deepEqual(testEqualVector(mixV.add(two), mixV.getX() + 12345, mixV.getY() + 678910), true, "testing add mix vector");
  assert.deepEqual(testEqualVector(mixV.sub(two), mixV.getX() - 12345, mixV.getY() - 678910), true, "testing sub mix vector");
  assert.deepEqual(testEqualVector(mixV.add(three), mixV.getX() - 20, mixV.getY() - 10), true, "testing add mix vector");
  assert.deepEqual(testEqualVector(mixV.sub(three), mixV.getX() + 20, mixV.getY() + 10), true, "testing sub mix vector");
  assert.deepEqual(testEqualVector(mixV.add(four), mixV.getX() - 1000000, mixV.getY() - 234567), true, "testing add mix vector");
  assert.deepEqual(testEqualVector(mixV.sub(four), mixV.getX() + 1000000, mixV.getY()  + 234567), true, "testing sub mix vector");
  assert.deepEqual(testEqualVector(mixV.add(five), mixV.getX() + 5656565, mixV.getY() - 100), true, "testing add mix vector");
  assert.deepEqual(testEqualVector(mixV.sub(five), mixV.getX() - 5656565, mixV.getY() + 100), true, "testing sub mix vector");
  
});



QUnit.module("createLibrary::testAdd", 
       {beforeEach: function(){
                                  library = [];
                                  library = createLibrary();}
       }
);



/**
 * Compares an Item object to an object literal. 
 * @param item 
 * @param objectLiteral 
 * @return true if item and objectLiteral have the exact same properties and values for those properties.
 */
var itemEquals = function(item, objectLiteral){
    var out = false;
    var keys = Object.keys(objectLiteral);

    if(item.properties().toString() !== keys.toString())
        return false;

    for(var i = 0; i < keys.length; i++){
        if (item.get(keys[i]).toString() !== objectLiteral[keys[i]].toString())
          return false;
    }

    return true;
}

QUnit.test("BasicFunctionality", function(assert){
    assert.throws(
        function(){
            library.add({type:"not a book"});
        },
        undefined,
        "Test invalid item type"
    );

    assert.throws(
        function(){
            library.add({});
        },
        undefined,
        "Test empty item type"
    );
    
    var sanityCheck = library.find({type:'book'});
    assert.equal(
            sanityCheck.length,
            0, 
            "Test nothing has been added so far"
    );

    sanityCheck = library.find({type:'music'});
    assert.equal(
            sanityCheck.length,
            0, 
            "Test nothing has been added so far"
    );

    sanityCheck = library.find({type:'video'});
    assert.equal(
            sanityCheck.length,
            0, 
            "Test nothing has been added so far"
    );

    //now actually add something
    var item = {type:'book', author:'davin', title:'CS312 memoirs'};
    library.add(item);
    var result = library.find({type:'book'});  
    assert.equal(
            result.length,
            1, 
            "Test that only one item has been added"
    );

    assert.ok(itemEquals(result[0], item), "Verify properties are the same");

    library.add({type:'book', author:'davin', title:'CS312 memoirs'});
    result = library.find({type:'book'});
    assert.equal(
            result.length,
            1,
            "Test duplicate does not add new item"
    );
});

QUnit.test("changeUndefinedToUnknown", function(assert){
    library.add({type:'music'});
    library.add({type:'book'});
    library.add({type:'video', year:undefined});

    var music = library.find({type:'music'});
    assert.equal(music[0].get("title"),"unknown","test unknown music title");
    assert.equal(music[0].get("artist"), "unknown", "test unknown music artist");

    var book = library.find({type:'book'});
    assert.equal(book[0].get("title"),"unknown","test unknown book title");
    assert.equal(book[0].get("author"), "unknown", "test unknown book author");

    var video = library.find({type:'video'});
    assert.equal(video[0].get("title"),"unknown","test unknown video title");
    assert.equal(video[0].get("director"), "unknown", "test unknown video director");
    assert.equal(video[0].get("year"), "unknown", "test unknown video year");
});

QUnit.test("MultipleAuthors", function(assert){
    var book = {type:'book', author:['sherif', 'tom'] };
    library.add(book);
    var retrieved = library.find(book);
    assert.deepEqual(retrieved[0].get("author"), ['sherif','tom'], 'test successful addition of multiple authors');
});

QUnit.test("mergeDuplicates", function(assert){
    var item = {type:'book', author:'sherif'};
    library.add(item);
    var retrieved = library.find(item);
    assert.notDeepEqual(retrieved, [], 'Verify that object was successfully added');
   
    item['year'] = 2016;
    library.add(item);
    retrieved = library.find({type:'book'});
    assert.equal(retrieved.length, 1, "No duplicate was created");
    assert.ok(itemEquals(retrieved[0], item), "Verify all properties are correct");
});

QUnit.test("mergeItemWithArrayProperty", function(assert){
    var item = {type:'music', artist:['sherif', 'davin']};
    library.add(item);
    var retrieved = library.find(item);
    assert.notDeepEqual(retrieved, [], 'Verify that object was successfully added');
   
    item['year'] = 2016;
    library.add(item);
    retrieved = library.find({type:'music'});
    assert.equal(retrieved.length, 1, "No duplicate was created");
    assert.ok(assert.ok(itemEquals(retrieved[0], item), "Verify properties are the same"));
});

QUnit.test("collisionCreatesNewItem", function(assert){
    var item = {type:'book', author:'sherif'};
    library.add(item);
    var retrieved = library.find(item);
    assert.notDeepEqual(retrieved, [], 'Verify that object was successfully added');

    var newItem = {type:'book', author:'not sherif'};
    library.add(newItem);
    retrieved = library.find({type:'book'});
    assert.equal(retrieved.length, 2, "Verify that a new item was created");
});

QUnit.test("propertyIsSubsetOfPropertyArrayCreatesNewItem", function(assert){
    var item = {type:'book', author:['sherif','davin']};
    library.add(item);
    var retrieved = library.find(item);
    assert.notDeepEqual(retrieved, [], 'Verify that object was successfully added');    
    assert.equal(retrieved.length, 1, 'Verify that nothing other than the object is in the library');

    var subset = {type:'book', author:'sherif'};
    library.add(subset);
    retrieved = library.find(subset);
    assert.equal(retrieved.length, 2, "Verify that two records have now been created");
});

QUnit.test("intPropertyAndStringPropertyDoNotCreateDuplicate", function(assert){
    var item1 = {type:'video', director:'tom', year:2015};
    var item2 = {type:'video', director:'tom', year:"2015"};

    library.add(item1);
    library.add(item2);

    var retrieved = library.find({type:'video'});
    assert.equal(retrieved.length, 1, "verify that exactly one item was created i.e: a duplicate was not created");
});


// ==========================  TestFind  ============================ \\

QUnit.module("createLibrary::testFind",  {
    beforeEach: function(){
        library = [];
        library = createLibrary();
        var item1 = {type:'book', author:'sherif', title:'Unit Testing vs Religion'};
        var item2 = {type:'book', author:'davin', title:"One Test a day mitigates customer dismay"};
        var item3 = {type:'book', author:'sherif', title:"Design choices: Hardcoding vs not meeting the deadline"};
        var item4 = {type:'music', artist:'Abott', title:'As Real as it gets'}; //it's funny because his research area is real analysis
        var item5 = {type:'music', artist:['Scharstein','Abott', 'Velez'], title:'The Best of the Doughboys'};
        var item6 = {type:'music', artist:'Metallica', title:'Old McDonald had a farm'};
        var item7 = {type:'video', director:'Spielbro', title:"spooks"};
        var item8 = {type:'video', director:'Tarantino', title:"The goriest gory movie ever which I am not going to explain on any interview"};
        var item9 = {type:'video', director:'Kaizer Chiefs', title:"Kaizer Phfizer"};

        library.add(item1);
        library.add(item2);
        library.add(item3);
        library.add(item4);
        library.add(item5);
        library.add(item6);
        library.add(item7);
        library.add(item8);
        library.add(item9);
    }
});

QUnit.test("findAllObjectsWithProperties", function(assert){
    var booksBySherif = library.find({author:'sherif'});
    assert.equal(booksBySherif.length, 2, "Find by author property");

    var UTSAndReligion = library.find({author:'sherif', title:'Unit Testing vs Religion'});
    assert.equal(UTSAndReligion.length, 1, "Find by author and title properties", "Test ");
    assert.equal(UTSAndReligion.get("title"), "Unit Testing vs Religion", "Test get title property");

    var allBooks = library.find({type:'book'});
    assert.equal(allBooks.length, 3, "Find by book type property");

    var allMusic = library.find({type:'music'});
    assert.equal(allMusic.length, 3, "Find by music type property");

    var allVideos = library.find({type:'video'});
    assert.equal(allVideos.length, 3, "Find by music type property");

    var musicByAbott = library.find({artist:"Abott"});
    assert.equal(musicByAbott.length, 2, "Find artist who is member of a group");
});

QUnit.test("badSearchQueries", function(assert){
    var query1 = [];
    var query2 = {};
});