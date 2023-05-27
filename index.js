//// Initial API test
// $.ajax(`https://www.dnd5eapi.co/api/spells/druidcraft`)
// .then((v) => {
//     console.log(v)
// })
const $Search = $('.search');

$Search.on('submit', (event) => {
    // page stop
    event.preventDefault();
    
    // declare constant for jquery & test
    const formData = new FormData(event.target);
    console.log(formData);

    const spell = formData.get('spell');
    console.log(spell);

    //api
    const spellAPI = `https://www.dnd5eapi.co/api/spells/${spell.toLowerCase().replace(' ', '-').replace(' ', '-')}`
    console.log(spellAPI);
    // declare
    const $img = $(".spellSchoolImg");
    const $spellNameRes = $(".spellNameRes");
    const $spellDesRes = $(".spellDesRes");
    const $spellLvlRes = $("#spellLvlRes");
    const $upcastingRes = $("#upcastingRes");
    const $spellComRes = $("#spellComRes");
    const $spellMatRes = $("#spellMatRes");
    const $spellSchoolRes = $("#spellSchoolRes")

    // clear results
    $img.empty();
    $spellNameRes.empty();
    $spellDesRes.empty();
    $spellLvlRes.empty();
    $upcastingRes.empty();
    $spellComRes.empty();
    $spellMatRes.empty();
    $spellSchoolRes.empty();
    $spellDesRes.html(`<div>Loading...</div>`);

    $.ajax(spellAPI)
        .then((data) => {
            $spellSchoolRes.html(`<div>${data.school.name}</div>`)
            $img.html(`<img src=./magic/${data.school.name}.jpg>`);
            $spellNameRes.html(`<div>${data.name}</div>`)
            $spellDesRes.html(`<div>${data.desc}</div>`)
            if (data.level > 0){
                $spellLvlRes.html(`<div>Level ${data.level} Spell</div>`)
            }else{
                $spellLvlRes.html(`<div>This spell is a cantrip!</div>`)}
            $upcastingRes.html(`<div>${data.higher_level}</div>`)
            $spellComRes.html(`<div>${data.components}</div>`)
            console.log(data.material)
            if (data.material != undefined){
                $spellMatRes.html(`<div>${data.material}</div>`)
            } else {
                $spellMatRes.html(`<div>This spell has no material components</div>`)
            }
})})