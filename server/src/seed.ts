import { PrismaClient } from '@prisma/client'
import { set } from 'date-fns/set'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createData() {
    const admin = await createAdmin();
    const dishes = await createDishes();
    const categories = await createCategories();
    const tags = await createTags();
    const spaghetti_vege = await createRecipe("Spaghetti wegetariańskie",
        0,
        30,
        0,
        "blabla",
        4,
        "kot",
        [categories.vegetarian],
        [dishes.dinner, dishes.main_dishes],
        [tags.tomato, tags.mushrooms, tags.onion, tags.garlic, tags.pasta, tags.cheese]);
    const spaghetti_con_carne = await createRecipe("Spaghetti z mięsem",
        0,
        30,
        0,
        "blabla",
        4,
        "kot",
        [categories.meat],
        [dishes.dinner, dishes.main_dishes],
        [tags.tomato, tags.mushrooms, tags.onion, tags.garlic, tags.pasta, tags.cheese, tags.beef]);
    console.log("Fake data created")
}

async function createAdmin() {
    const admin = await prisma.user.upsert({
        where: {email: 'admin@localhost'},
        update: {},
        create: {
            email: 'admin@localhost',
            password: bcrypt.hashSync('admin', 10),
            role: 'ADMIN',
            birthdate: new Date(),
            name: 'Admin',
            surname: 'Admin',
            username: 'admin',
            activate_time: new Date(),
        }
    });
    console.log("Admin created with default login and password")
    return admin;
}

async function createTags() {

    function createTag(name: string) {
        return prisma.tag.create({
            data: {
                name: name
            }
        });
    }

    const tomato = await createTag("pomidor");
    const eggs = await createTag("jajka");
    const mushrooms = await createTag("grzyby");
    const onion = await createTag("cebula");
    const garlic = await createTag("czosnek");
    const pasta = await createTag("makaron");
    const cheese = await createTag("ser");
    const chicken = await createTag("kurczak");
    const pork = await createTag("wieprzowina");
    const beef = await createTag("wołowina");
    const rice = await createTag("ryż");
    const potatoes = await createTag("ziemniaki");
    const carrot = await createTag("marchewka");
    const fish = await createTag("ryba");
    const spinach = await createTag("szpinak");
    const strawberry = await createTag("truskawka");

    return {
        "tomato": tomato,
        "eggs": eggs,
        "mushrooms": mushrooms,
        "onion": onion,
        "garlic": garlic,
        "pasta": pasta,
        "cheese": cheese,
        "chicken": chicken,
        "pork": pork,
        "beef": beef,
        "rice": rice,
        "potatoes": potatoes,
        "carrot": carrot,
        "fish": fish,
        "spinach": spinach,
        "strawberry": strawberry
    }
}

async function createDishes() {

    function createDish(name: string) {
        return prisma.dish.create({
            data: {
                name: name
            }
        });
    }

    const sniadanie = await createDish("śniadanie");
    const obiad  = await createDish("obiad");
    const kolacja = await createDish("kolacja");
    const przekaska = await createDish("przekąska");
    const deser = await createDish("deser")
    const napoj = await createDish("napój");
    const lunche = await createDish("lunche");
    const zupy = await createDish("zupy");
    const surowki = await createDish("surówki");
    const przystawki = await createDish("przystawki");
    const dania_glowne = await createDish("dania główne");
    return {
        "breakfast": sniadanie,
        "dinner": obiad,
        "supper": kolacja,
        "snack": przekaska,
        "dessert": deser,
        "drink": napoj,
        "lunches": lunche,
        "soups": zupy,
        "salads": surowki,
        "side_dishes": przystawki,
        "main_dishes": dania_glowne
    };
}

async function createCategories() {
    function createCategory(name: string) {
        return prisma.category.create({
            data: {
                name: name
            }
        });
    }

    const vegetarian = await createCategory("wegetariańskie");
    const vegan = await createCategory("wegańskie");
    const gluten_free = await createCategory("bezglutenowe");
    const lactose_free = await createCategory("bezlaktozowe");
    const low_calorie = await createCategory("niskokaloryczne");
    const low_carb = await createCategory("niskowęglowodanowe");
    const high_protein = await createCategory("wysokobiałkowe");
    const keto = await createCategory("keto");
    const steamed = await createCategory("na parze");
    const meat = await createCategory("mięsne");

    return {
        "vegetarian": vegetarian,
        "vegan": vegan,
        "gluten_free": gluten_free,
        "lactose_free": lactose_free,
        "low_calo": low_calorie,
        "low_carb": low_carb,
        "high_protein": high_protein,
        "keto": keto,
        "steamed": steamed,
        "meat": meat,
    }
}

async function createRecipe(
    name: string,
    hours: number,
    minutes: number,
    seconds: number,
    description: string,
    servings: number,
    image_id: string | null = null,
    cats: any[],
    dishes: any[],
    tags: any[] = []) {

    const dishess: { dish_id: number}[] = dishes.map(dish => dish.id).map(dish_id => {
        return {dish_id: dish_id}
    });
    const catss: { category_id: number}[] = cats.map(cat => cat.id).map(category_id => {
        return {category_id: category_id}
    });
    const tagss: { tag_id: number}[] = tags.map(tag => tag.id).map(tag_id => {
        return {tag_id: tag_id}
    });
    return prisma.recipe.upsert({
        where: {
            name: name
        },
        update: {},
        create: {
            name: name,
            cook_time: set(new Date(), { hours: hours, minutes: minutes, seconds: seconds }),
            description: description,
            servings: servings,
            image_id: image_id,
            recipe_has_dish: {
                createMany: {
                    data: dishess
                }
            },
            recipe_has_category: {
                createMany: {
                    data: catss
                }
            },
            recipe_has_tag: {
                createMany: {
                    data: tagss
                }
            }
        }
    });
}

// run the seed function
createData()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });