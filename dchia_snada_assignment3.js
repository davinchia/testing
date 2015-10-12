QUnit.module("createVector Tests");

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