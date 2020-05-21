// filteredJourneys: function(){
//     return this.journeys.filter(journey => {
//         return journey.title.match(this.search);
//     });
// }


// const search ="chypre";

// function test(){
//     const search = "me"
//     console.log(this.search)
//     console.log(this)
// }

// test();

const name = 'kc'
const obj = {
    name: 'maomao',
    catName(){
        () =>{
            console.log(this.name)}
    }
}

obj.catName();