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

    //TESTING
    const selector = formData.get('dropDown')
    console.log(selector)
    //TESTING

    const spell = formData.get('spell');
    console.log(spell);

    //api
    const spellAPI = `https://www.dnd5eapi.co/api/${selector}/${spell.toLowerCase().replace(' ', '-').replace(' ', '-')}`
    console.log(spellAPI);
    // declare
    const $img = $(".spellSchoolImg");
    const $spellNameRes = $(".spellNameRes");
    const $spellDesRes = $(".spellDesRes");
    const $spellLvlRes = $("#spellLvlRes");
    const $upcastingRes = $("#upcastingRes");
    const $spellComRes = $("#spellComRes");
    const $spellMatRes = $("#spellMatRes");
    const $leftBox = $("#leftBox")
    const $rightBox = $("#rightBox")
    const $spellSchoolRes = $("#spellSchoolRes")

    // clear results
    $img.empty();
    $spellNameRes.empty();
    $spellDesRes.empty();
    $spellLvlRes.empty();
    $upcastingRes.empty();
    $spellComRes.empty();
    $spellMatRes.empty();
    $spellDesRes.html(`<div>Loading...</div>`);

    $.ajax(spellAPI)
        .then((data) => {
            if (selector === 'spells') {
                $leftBox.empty();
                $rightBox.empty();
                $spellSchoolRes.empty();
                $leftBox.html(`<div>Spell Level</div>`)
                $rightBox.html(`<div>Spell Components</div>`)
                $spellSchoolRes.html(`<div>School of Magic</div>`)   
                
                $img.html(`<img src=./magic/${data.school.name}.jpg>`);
                $spellNameRes.html(`<div class="spellNameRes">${data.name}</div>`)
                $spellDesRes.html(`<div class="spellDesRes">${data.desc}</div>`)
                if (data.level > 0){
                    $spellLvlRes.html(`<div class="spellContent1" id="spellLvlRes">Level ${data.level} Spell</div>`)
                }else{
                    $spellLvlRes.html(`<div class="spellContent1" id="spellLvlRes">This spell is a cantrip!</div>`)}
                $upcastingRes.html(`<div class="spellContent2" id="upcastingRes">${data.higher_level}</div>`)
                $spellComRes.html(`<div class="spellContent1" id="spellComRes">${data.components}</div>`)
                // console.log(data.material)
                if (data.material != undefined){
                    $spellMatRes.html(`<div class="spellContent2" id="spellMatRes">${data.material}</div>`)
                } else {
                    $spellMatRes.html(`<div class="spellContent2" id="spellMatRes">This spell has no material components</div>`)
                }
            } else if (selector === 'classes') {
                $leftBox.empty();
                $rightBox.empty();
                $spellSchoolRes.empty();

                $spellNameRes.html(`<div class="spellNameRes">Skills</div>`)
                $spellDesRes.html(`<div class="spellDesRes">${data.proficiency_choices.map(v => v.desc)}</div>`)

                $leftBox.html(`<div>Saving Throws</div>`)
                $upcastingRes.html(`<div>${data.saving_throws.map(v => v.name)}</div>`)

                $rightBox.html(`<div>Proficiencies</div>`)
                $spellMatRes.html(`<div>${data.proficiencies.map(v => v.name)}</div>`)
                
                $spellSchoolRes.html(`<div>Hit Dice</div>`)
                $img.html(`<div>d${data.hit_die}</div>`)
            } else if (selector === 'races'){

            }
})})