const replace_item=[
    ['farmersdelight:rope', 'supplementaries:rope'],
    ['croptopia:grape', 'vinery:red_grape'],
    ['croptopia:cherry', 'vinery:cherry'],
    ['croptopia:coffee_beans', 'farmersrespite:coffee_beans'],
    ['croptopia:tea_leaves', 'farmersrespite:green_tea_leaves'],
]

const delete_item=[
    ['farmingforblockheads:feeding_trough', 'animal_feeding_trough:feeding_trough'],
    ['geodes:calcite_stairs', 'spectrum:calcite_stairs'],
    ['geodes:calcite_slab', 'spectrum:calcite_slab'],
    ['farmersdelight:carrot_crate', 'blockus:carrot_crate'],
    ['farmersdelight:potato_crate', 'blockus:potato_crate'],
    ['farmersdelight:beetroot_crate', 'blockus:beetroot_crate'],
    ['vinery:apple_crate', 'blockus:apple_crate'],
    ['croptopia:grape_seed', 'vinery:red_grape_seeds'],
    ['supplementaries:quiver', 'nyfsquiver:basic_quiver'],
    ['blockus:paper_lamp', 'mcwlights:white_paper_lamp'],
    ['croptopia:garlic_seed', 'croptopia:garlic'],
    ['croptopia:onion_seed', 'farmersdelight:onion'],
    ['croptopia:rice_seed', 'farmersdelight:wild_rice'],
    ['supplementaries:sugar_cube', 'blockus:sugar_block']
]

ServerEvents.recipes(event => {
    replace_item.forEach((replace_item) => {
        event.replaceInput({}, replace_item[0], replace_item[1]);
        event.replaceOutput({}, replace_item[0], replace_item[1]);
        event.shapeless(replace_item[1], [replace_item[0]]);
    });

    delete_item.forEach((delete_item) => {
        event.remove({ id: delete_item[0] });
        event.remove({ output: delete_item[0] });
        event.shapeless(delete_item[1], [delete_item[0]]);
    });
    
});

LootJS.modifiers((event) => {
    replace_item.forEach((replace_item) => {
        event
            .addLootTypeModifier(LootType.BLOCK,
                LootType.ENTITY,
                LootType.CHEST,
                LootType.FISHING,
                LootType.GIFT)
            .replaceLoot(replace_item[0], replace_item[1], true); 
    });
    
    delete_item.forEach((delete_item) => {
        event
            .addLootTypeModifier(LootType.BLOCK,
                LootType.ENTITY,
                LootType.CHEST,
                LootType.FISHING,
                LootType.GIFT)
            .replaceLoot(delete_item[0], delete_item[1], true); 
    });

    event.addBlockLootModifier('croptopia:coffee_crop')
        .replaceLoot('farmersrespite:coffee_beans', 'farmersrespite:coffee_berries', true);
})