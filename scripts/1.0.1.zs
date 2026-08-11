import crafttweaker.api.ingredient.IIngredient;

craftingTable.addShaped("Minigun_Motor", <item:pointblank:motor>, [
    [<item:minecraft:redstone>, <item:minecraft:redstone>, <item:minecraft:stone_button>],
    [<item:pointblank:gunmetal_ingot>, <item:pointblank:gunmetal_ingot>, <item:pointblank:gunmetal_ingot>],
    [<item:minecraft:air>, <item:minecraft:air>, <item:minecraft:air>]
] as IIngredient[][]);