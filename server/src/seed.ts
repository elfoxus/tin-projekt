import { PrismaClient } from '@prisma/client'
import { set } from 'date-fns/set'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function createData() {
    const admin = await createAdmin();
    const moderator = await createModerator();
    const user1 = await createUser('janko', 1);
    const user2 = await createUser('franko', 2);
    const user3 = await createUser('hanko', 3);
    const dishes = await createDishes();
    const categories = await createCategories();
    const tags = await createTags();

    const spaghetti_vege = await createSpaghettiVege(categories, dishes, tags);
    const spaghetti_con_carne = await createSpaghettiConCarne(categories, dishes, tags);
    const matchaCheesecake = await createMatchaCheesecake(categories, dishes, tags);
    const scrambledEggs = await createScrambledEggs(categories, dishes, tags);
    const ketoPancake = await createKetoPancake(categories, dishes, tags);
    const ciastoDyniowe = await createCiastoDyniowe(categories, dishes, tags);
    const goldenMilk = await createGoldenMilk(categories, dishes, tags);

    const comment = await createComment(spaghetti_con_carne.id, user1.username, "Bardzo dobre");
    const comment2 = await createComment(spaghetti_con_carne.id, user2.username, "Pyszny przepis! Zrobię na pewno nie jeden raz!");
    const comment3 = await createComment(spaghetti_vege.id, user1.username, "Dobra bezmięsna opcja. Polecam");
    const comment4 = await createComment(spaghetti_vege.id, user2.username, "Zrobiłem i jestem zadowolony. Polecam");
    const comment5 = await createComment(spaghetti_vege.id, user3.username, "Dobre, ale nie dla mnie");

    const favourites = await addToFavourites(spaghetti_con_carne.id, user1.id);
    const favourites2 = await addToFavourites(spaghetti_con_carne.id, user2.id);
    const favourites3 = await addToFavourites(spaghetti_vege.id, user3.id);

    const rating1 = await addRating(spaghetti_con_carne.id, user1.id, 5);
    const rating2 = await addRating(spaghetti_con_carne.id, user2.id, 4);
    const rating3 = await addRating(spaghetti_con_carne.id, user3.id, 5);
    const rating4 = await addRating(spaghetti_vege.id, user1.id, 5);
    const rating5 = await addRating(spaghetti_vege.id, user2.id, 4);
    const rating6 = await addRating(spaghetti_vege.id, user3.id, 2);

    console.log("Fake data created")
}


async function createGoldenMilk(categories: any, dishes: any, tags: any) {
    const goldenMilk = await createRecipe("Złote mleko",
        0,
        10,
        0,
        "Napój o właściwościach prozdrowotnych.",
        2,
        "golden-milk",
        [categories.vegetarian, categories.vegan, categories.lactose_free],
        [dishes.drink],
        []);

    const goldenMilkSteps = await createRecipeSteps(goldenMilk.id, [
        {no: 1, description: "Wszystkie składniki umieścić w garnku i podgrzewać, aż się zagotują."},
        {no: 2, description: "Podawać ciepłe."},
    ])

    const goldenMilkIngredients:{id: number, name: string}[] = await createRecipeIngredients(goldenMilk.id, [
        "1 szklanka mleka roślinnego",
        "1 łyżeczka kurkumy",
        "1 łyżeczka miodu",
        "1 łyżka oleju kokosowego",
        "1 łyżeczka imbiru",
        "1 łyżeczka cynamonu",
        "1 łyżeczka kardamonu",
        "szczypta pieprzu"
    ])

    return goldenMilk;
}

async function createCiastoDyniowe(categories: any, dishes: any, tags: any) {
    const ciastoDyniowe = await createRecipe("Ciasto dyniowe z herbatą",
        2,
        0,
        0,
        "Pyszne ciasto dyniowe z domieszką herbaty.",
        10,
        "ciasto-dyniowe",
        [categories.vegetarian, categories.vegan],
        [dishes.dessert],
        []);

    const ciastoDynioweSteps = await createRecipeSteps(ciastoDyniowe.id, [
        {no: 1, description: "Dynię obrać, pokroić w kostkę i ugotować na parze."},
        {no: 2, description: "W międzyczasie zalać herbatę wrzątkiem i odstawić do ostygnięcia."},
        {no: 3, description: "Ostudzoną dynię zmiksować na gładką masę."},
        {no: 4, description: "Wymieszać wszystkie mokre składniki i zblendować"},
        {no: 5, description: "Wymieszać wszystkie suche składniki i dodać do nich mokre."},
        {no: 6, description: "Wylać ciasto do formy i piec w 180 stopniach przez 50-60 minut."},
    ])

    const ciastoDynioweIngredients:{id: number, name: string}[] = await createRecipeIngredients(ciastoDyniowe.id, [
        "2 szklanki mąki pszennej",
        "1 łyżeczka proszku do pieczenia",
        "1/2 łyżeczka sody",
        "1/3 łyżeczki soli",
        "1 szklanka puree z dyni",
        "3/4 szklanki cukru trzcinowego",
        "1/2 szklanki oleju",
        "1/3 szklanki mocnej herbaty Earl Grey",
        "2 łyżki octu jabłkowego"
    ])

    return ciastoDyniowe;
}

async function createKetoPancake(categories: any, dishes: any, tags: any) {
    const ketoPancake = await createRecipe("Naleśniki ketogeniczne",
        0,
        20,
        0,
        "Naleśniki bez mąki, bez cukru, bez glutenu, bez węglowodanów",
        2,
        "keto-pancake",
        [categories.keto],
        [dishes.breakfast, dishes.dessert],
        [tags.eggs]);

    const ketoPancakeSteps = await createRecipeSteps(ketoPancake.id, [
        {no: 1, description: "Wszystkie składniki naleśników umieścić w blenderze i zmiksować na gładką masę."},
        {no: 2, description: "Na patelni rozgrzać olej kokosowy i smażyć naleśniki z obu stron na złoty kolor."},
    ])

    const ketoPancakeIngredients:{id: number, name: string}[] = await createRecipeIngredients(ketoPancake.id, [
        "3 jajka", "3 łyżeczki mascarpone", "1 łyżeczka oleju kokosowego"
    ]);

    return ketoPancake;
}

async function createScrambledEggs(categories: any, dishes: any, tags: any) {
    const scrambledEggs = await createRecipe("Jajecznica",
        0,
        10,
        0,
        "Klasyczna jajecznica z cebulą i szczypiorkiem",
        2,
        "jajecznica",
        [categories.meat],
        [dishes.breakfast, dishes.dinner],
        [tags.eggs, tags.onion]);
    const scrambledEggsSteps = await createRecipeSteps(scrambledEggs.id, [
        {no: 1, description: "Cebulę pokroić w kostkę, szczypiorek posiekać."},
        {no: 2, description: "Na patelni rozgrzać olej, dodać cebulę i smażyć, aż się zeszkli."},
        {no: 3, description: "Jajka roztrzepać z mlekiem, solą i pieprzem."},
        {no: 4, description: "Dodać do cebuli i smażyć, mieszając, aż się zetną."},
        {no: 5, description: "Na koniec dodać szczypiorek."},
        {no: 6, description: "Podawać z chlebem."}
    ]);
    const scrambledEggsIngredients:{id: number, name: string}[] = await createRecipeIngredients(scrambledEggs.id, [
        "3 jajka",
        "1 łyżka mleka",
        "1 cebula",
        "1 łyżka oleju",
        "1 łyżka posiekanego szczypiorku",
        "sól",
        "pieprz"
    ]);
    return scrambledEggs;
}

async function createMatchaCheesecake(categories: any, dishes: any, tags: any) {
    const matchaCheesecake = await createRecipe("Sernik matcha",
        2,
        0,
        0,
        "Pyszny sernik w wydaniu azjatyckim o smaku herbaty matcha.",
        10,
        "matcha-cheesecake",
        [categories.high_protein],
        [dishes.dessert],
        [tags.eggs, tags.cheese]);
    const matchaCheesecakeSteps = await createRecipeSteps(matchaCheesecake.id, [
        {no: 1, description: "Rozgnieść herbatniki. Wymieszać z roztopionym masłem i wyłożyć na dno tortownicy."},
        {no: 2, description: "Matchę wymieszać z 2 łyżkami gorącej wody."},
        {no: 3, description: "Ser miksować w misce 2-3 minuty, aby uzyskać jednolitą, napowietrzoną masę"},
        {no: 4, description: "Dodać cukier"},
        {no: 5, description: "Dodawać jajka po jednym, zmniejszyć obroty miksera"},
        {no: 6, description: "Dodać śmietanki"},
        {no: 7, description: "Dodać matchę"},
        {no: 8, description: "Dodać eksktrakt waniliowy"},
        {no: 9, description: "Dodać mąkę i wymieszać dokładnie łyżką"},
        {no: 10, description: "Wylać masę na herbatniki"},
        {no: 11, description: "Formę ustawić w kąpieli wodnej. Użyć gorącej wody"},
        {no: 12, description: "Przykryć formę folią aluminiową"},
        {no: 13, description: "Piekarnik powinien być nagrzany do 170 stopni. Piec w tej temperaturze przez 15 minut. Następnie obniżyć ją do 120 stopni i piec kolejne 45-60 minut."},
        {no: 14, description: "Po upieczeniu wyjąć z piekarnika i ostudzić. Następnie wstawić do lodówki na kilka godzin."}
    ]);
    const matchaCheesecakeIngredients:{id: number, name: string}[] = await createRecipeIngredients(matchaCheesecake.id, [
        "200g herbatników",
        "100g masła",
        "1kg zmielonego twarogu",
        "200g cukru",
        "6 jajek",
        "200ml śmietanki 30%",
        "2 łyżki herbaty matcha",
        "1 łyżeczka ekstraktu waniliowego",
        "4 łyżki mąki",
        "2 łyżki gorącej wody"
    ]);
}

async function createSpaghettiConCarne(categories: any, dishes: any, tags: any) {
    const spaghetti_con_carne = await createRecipe("Spaghetti z mięsem",
        0,
        30,
        0,
        "Klasyczne spaghetti z mięsem mielonym i sosem pomidorowym",
        4,
        "spaghetti-con-carne",
        [categories.meat],
        [dishes.dinner, dishes.main_dishes],
        [tags.tomato, tags.mushrooms, tags.onion, tags.garlic, tags.pasta, tags.cheese, tags.beef]);
    const spaghetti_con_carne_steps = await createRecipeSteps(spaghetti_con_carne.id, [
        {no: 1, description: "Włącz patelnię na bardzo niski ogień. Dodaj oliwę oraz zioła prowansalskie. W momenci kiedy zioła zaczną pachnieć, zdejmij do miski."},
        {no: 2, description: "Cebulę i czosnek posiekaj. Na patelni rozgrzej oliwę, dodaj cebulę i smaż przez 2 minuty. Dodaj czosnek i smaż przez kolejną minutę."},
        {no: 3, description: "Zdejmij z ognia i przełóż do miski."},
        {no: 4, description: "Na tej samej patelni podsmaż mięso mielone. Dodaj do cebuli i czosnku."},
        {no: 5, description: "Dodaj passatę pomidorową. Gotuj przez 10 minut."},
        {no: 6, description: "Makaron ugotuj al dente w osolonej wodzie. Odcedź i wymieszaj z sosem."},
        {no: 7, description: "Podawaj z posypanymi płatkami drożdżowymi lub startym serem i świeżą bazylią."}
    ]);

    const spaghetti_con_carne_ingredients:{id: number, name: string}[] = await createRecipeIngredients(spaghetti_con_carne.id, [
        "0,5kg mięsa mielonego",
        "1 cebula",
        "2 ząbki czosnku",
        "1 butelka passaty pomidorowej",
        "2 łyżeczki ziół prowansalskich do sosu",
        "parmezan do posypania lub płatki drożdżowe",
        "sól",
        "pieprz",
        "oliwa z oliwek do sosu",
        "makaron spaghetti lub inny",
        "świeża bazylia do posypania"
    ]);

    return spaghetti_con_carne;
}

async function createSpaghettiVege(categories: any, dishes: any, tags: any) {
    const spaghetti_vege = await createRecipe("Spaghetti wegetariańskie",
        0,
        30,
        0,
        "Wegetariańska wersja spaghetti bolognese",
        4,
        "veganese",
        [categories.vegetarian],
        [dishes.dinner, dishes.main_dishes],
        [tags.tomato, tags.mushrooms, tags.onion, tags.garlic, tags.pasta, tags.cheese]);
    const spagetti_vege_ingredients:{id: number, name: string}[] = await createRecipeIngredients(spaghetti_vege.id, [
        "4 łyżki czarnej soczewicy",
        "15 suszonych grzybów",
        "szklanka wody",
        "2 łyżki dowolnego oleju do soczewicy",
        "2 łyżki sosu sojowego",
        "1 cebula",
        "3 marchewki",
        "kilka łodyg selera naciowego",
        "2 ząbki czosnku",
        "1 łyżeczka cynamonu cejlońskiego",
        "1 gwiazdka anyżu",
        "szczpyta soli",
        "1/4 szklanki wytrawnego wina (opcjonalnie)",
        "butelka passaty pomidorowej",
        "makaron spaghetti lub inny",
        "płatki drożdżowe do posypania",
        "świeża bazylia do posypania",
        "sól",
        "pieprz",
        "oliwa z oliwek do sosu",
        "2 łyżeczki ziół prowansalskich do sosu",
    ])
    const spaghetti_vege_steps = await createRecipeSteps(spaghetti_vege.id, [
        {no: 1, description: "Soczewicę i grzyby zalej sosem sojowym, wodą i olejem. Wstaw na mały ogień i gotuj pod przykryciem 20-25 minut do wchłonięcia płynów."},
        {no: 2, description: "Cebulę, marchewki i seler pokrój w kostkę. Czosnek posiekaj. Na patelni rozgrzej olej, dodaj cebulę i smaż przez 2 minuty. Dodaj marchewkę, seler i czosnek. Smaż aż warzywa zmiękną."},
        {no: 3, description: "Dodaj cynamon, anyż i sól. "},
        {no: 4, description: "Jeśli używasz wina, dodaj je teraz i gotuj, aż odparuje."},
        {no: 5, description: "W międzyczasie zblenduj soczewicę z grzybami na gładką masę. Dodaj do warzyw i wymieszaj."},
        {no: 6, description: "Dodaj passatę pomidorową i zioła prowansalskie. Gotuj przez 10 minut."},
        {no: 7, description: "Makaron ugotuj al dente w osolonej wodzie. Odcedź i wymieszaj z sosem."},
        {no: 8, description: "Podawaj z posypanymi płatkami drożdżowymi i świeżą bazylią."}
    ]);

    return spaghetti_vege;
}

async function addRating(recipeId: number, userId: number, rating: number) {
    return prisma.recipe_rating.create({
        data: {
            rating: rating,
            user_id: userId,
            recipe_id: recipeId
        }
    })
}

async function addToFavourites(recipeId: number, userId: number) {
    return prisma.favourite_recipes.create({
        data: {
            user_id: userId,
            recipe_id: recipeId
        }
    })
}

async function createComment(recipeId: number, username: string, msg: string) {

    return prisma.user.findUnique({where: {username: username}})
        .then(user => {

            if (!user) {
                throw new Error("User not found");
            }
            let userId = user.id;
            return prisma.recipe_review.createMany({
                data:
                    {
                        date: new Date(),
                        comment: msg,
                        recipe_id: recipeId,
                        user_id: userId
                    }

                })
        })
        .then(data => {
            return {
                message: "Comment added"
            }
        })
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

async function createUser(username: string, it: number) {
    return prisma.user.upsert({
        where: {email: `user+${it}@localhost`},
        update: {},
        create: {
            email: `user+${it}@localhost`,
            password: bcrypt.hashSync(username, 10),
            role: 'USER',
            birthdate: new Date(),
            name: 'Jan',
            surname: 'Kowalski',
            username: username,
            activate_time: new Date(),
        }
    })
}

async function createModerator() {
    const admin = await prisma.user.upsert({
        where: {email: 'mod@localhost'},
        update: {},
        create: {
            email: 'mod@localhost',
            password: bcrypt.hashSync('moderator', 10),
            role: 'MODERATOR',
            birthdate: new Date(),
            name: 'Moderator',
            surname: 'Moderator',
            username: 'moderator',
            activate_time: new Date(),
        }
    });
    console.log("Moderator created with default login and password")
    return admin;
}

async function createRecipeIngredients(recipeId: number, ingredients: string[]): Promise<any> {
    const createIngredient = (name: string) => {
        return prisma.ingredient.create({
            data: {
                name: name,
                recipe_id: recipeId
            }
        });
    }

    var created = ingredients.map(async (ingredient) => {
        const recipeIngredient = await createIngredient(ingredient);
        console.log(`Created ingredient ${recipeIngredient.name} for recipe ${recipeId}`);
        return recipeIngredient;
    });

    return Promise.all(created);
}

async function createRecipeSteps(recipeId: number, steps: {no: number, description: string}[]): Promise<any> {
    const createStep = (no: number, desc: string) => {
        return prisma.recipe_step.create({
            data: {
                number: no,
                description: desc,
                recipe_id: recipeId
            }
        });
    }

    var created = steps.map(async (step) => {
        const recipeStep = await createStep(step.no, step.description);
        console.log(`Created step ${recipeStep.number} for recipe ${recipeId}`);
        return recipeStep;
    })

    return Promise.all(created);
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